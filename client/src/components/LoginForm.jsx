import { useCallback, useEffect, useRef, useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import useLocalStorage from "../hooks/useLocalStorage";

const GENERIC_ERROR = {
  status: false,
  message: "Incorrect username or password.",
};

function LoginForm() {
  const [_, setUser] = useAuth();
  const [_2, setToken] = useLocalStorage("access_token");
  const [validCred, setValidCred] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const id = useId();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current.value.trim(),
          password: passwordRef.current.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      });
      const resJson = await res.json();
      console.log(res);
      if (res.status >= 500) {
        setValidCred({ status: false, message: "Server error." });
      }
      if (res.status !== 200) {
        setValidCred(GENERIC_ERROR);
      }
      if (resJson.token) {
        console.log(resJson);
        setValidCred({ status: true, message: "success" });
        setToken(resJson.token);

        setUser({
          data: {
            token: resJson.token,
            username: usernameRef.current.value.trim(),
          },
        });
        navigate("/", { replace: true });
      }

      passwordRef.current.value = "";
      // navigate("/ch/general", { replace: true });
    } catch (error) {
      setValidCred(GENERIC_ERROR);
      console.error(error);
    }
  };

  const inputStyle =
    "border-customLightOrange bg-customTrans1 focus:border-customLightBlue focus:bg-customTrans05 mb-2 block h-10 w-5/6 border px-4 outline-none focus:border";

  return (
    <div className="flex w-96 flex-col  items-center justify-between border border-customLightOrange bg-customTrans05  px-5 py-3">
      <h1 className="mt-10 mb-6 text-4xl font-bold text-cutsomYellow">login</h1>

      <form
        className="mb-10 flex w-full flex-col items-center"
        onSubmit={loginSubmitHandler}
      >
        <label htmlFor={"username-" + id} className="my-2 text-2xl">
          username
        </label>
        <input
          type="text"
          id={"username-" + id}
          className={inputStyle}
          ref={usernameRef}
        />
        <label htmlFor={"password-" + id} className="my-2 text-2xl">
          password
        </label>
        <input
          type="password"
          id={"password-" + id}
          className={inputStyle}
          ref={passwordRef}
        />

        <button
          type="submit"
          className="mt-10 w-5/6  border border-customLightOrange bg-customTrans05 p-3 text-customLightOrange hover:border-customLightBlue hover:bg-customBlue"
        >
          start chatting
        </button>
      </form>
      {validCred?.status === false && (
        <p className="text-md w-5/6 py-3 font-semibold text-red-500">
          {validCred?.message}
        </p>
      )}
    </div>
  );
}

export default LoginForm;
