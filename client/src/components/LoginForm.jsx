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
    <Card className="flex h-96 w-96 flex-col justify-between border p-5">
      <h1 className="mt-10 text-2xl font-bold">{headerMsg}</h1>

      <form className="mb-10 w-full" onSubmit={loginSubmitHandler}>
        <label htmlFor="user-name" className="my-2 text-xl opacity-80">
          username
        </label>
        <input
          type="text"
          className="mb-2 block h-16 w-5/6 border bg-transparent px-4"
          ref={inputRef}
        />

        {validUsername?.status === false && (
          <p className="w-5/6 text-sm text-red-500">{validUsername?.message}</p>
        )}

        <button
          type="submit"
          className="mt-2 border bg-white bg-opacity-20 p-3"
        >
          start chatting
        </button>
      </form>
    </Card>
  );
}

export default LoginForm;
