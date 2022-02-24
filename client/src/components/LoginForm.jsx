import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const serverUrl = "http://localhost:8000";

const CHAR_BOUNDRIES_ERROR = {
  status: false,
  message: "username has to be (4-25) characters & only contain (- _) symbols",
};
function LoginForm() {
  const [_, setUser] = useAuth();
  const [validUsername, setValidUsername] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const usernameValidator = useCallback((username) => {
    const reg = /^[a-zA-Z0-9_-]{4,25}$/;
    return reg.test(username);
  }, []);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const isValid = usernameValidator(inputRef.current.value);
    setValidUsername(() => (isValid ? { status: true } : CHAR_BOUNDRIES_ERROR));
    if (isValid) {
      const res = await fetch(serverUrl + "/api/guest/login", {
        method: "POST",
        // mode: "cors",
        credentials: "include", //because server is hosted on another url
        body: JSON.stringify({
          username: inputRef.current.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      });
      const resJson = await res.json();

      if (res.status === 201) {
        setUser({ uid: resJson.uid, token: resJson.token });
      } else {
        setValidUsername({
          status: false,
          message: resJson.message || "Server error..",
        });
      }
      inputRef.current.value = "";
      navigate("/ch/general", { replace: true });
    }
  };

  return (
    <div className="border-customLightOrange bg-customTrans05 flex h-96 w-96 flex-col items-center justify-between border p-5">
      <h1 className="text-cutsomYellow mt-10 text-4xl font-bold">
        login as guest!
      </h1>

      <form
        className="mb-10 flex w-full flex-col items-center"
        onSubmit={loginSubmitHandler}
      >
        <label htmlFor="user-name" className="my-2 text-2xl">
          username
        </label>
        <input
          type="text"
          className="bg-customTrans1 focus:bg-customTrans05 border-customLightOrange focus:border-customLightBlue mb-2 block h-16 w-5/6 border px-4 outline-none focus:border"
          ref={inputRef}
        />

        {validUsername?.status === false && (
          <p className="w-5/6 text-sm text-red-500">{validUsername?.message}</p>
        )}

        <button
          type="submit"
          className="bg-customTrans05 border-customLightOrange  text-customLightOrange hover:bg-customBlue hover:border-customLightBlue mt-4 w-5/6 border p-3"
        >
          start chatting
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
