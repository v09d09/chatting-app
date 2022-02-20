import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import Card from "./Card";

const serverUrl = "http://localhost:8000";

const CHAR_BOUNDRIES_ERROR = {
  status: false,
  message: "username has to be (4-25) characters & only contain (- _) symbols",
};
function LoginForm() {
  const [user, setUser] = useAuth();
  const [validUsername, setValidUsername] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const usernameValidator = useCallback((username) => {
    const reg = /^[a-z0-9_-]{4,25}$/;
    return reg.test(username);
  }, []);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const isValid = usernameValidator(inputRef.current.value);
    setValidUsername(() => (isValid ? { status: true } : CHAR_BOUNDRIES_ERROR));

    console.log(
      inputRef.current.value,
      "hittin: ",
      serverUrl + "/api/auth/login"
    );
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

  const headerMsg = user ? "change username!" : "login as guest!";

  return (
    <Card className="border w-96 h-96 p-5 flex justify-between flex-col">
      <h1 className="text-2xl font-bold mt-10">{headerMsg}</h1>

      <form className="w-full mb-10" onSubmit={loginSubmitHandler}>
        <label htmlFor="user-name" className="text-xl my-2 opacity-80">
          username
        </label>
        <input
          type="text"
          className="block bg-transparent border w-5/6 h-16 px-4 mb-2"
          ref={inputRef}
        />

        {validUsername?.status === false && (
          <p className="text-red-500 w-5/6 text-sm">{validUsername?.message}</p>
        )}

        <button
          type="submit"
          className="border mt-2 p-3 bg-white bg-opacity-20"
        >
          start chatting
        </button>
      </form>
    </Card>
  );
}

export default LoginForm;
