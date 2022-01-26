import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "./Card";

function LoginForm() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [invalidUsername, setInvalidUsername] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const usernameValidator = useCallback((username) => {
    const reg = /^[a-z0-9_-]{3,20}$/;
    return reg.test(username);
  }, []);
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = usernameValidator(inputRef.current.value);
    console.log(isValid);
    if (isValid) {
      setInvalidUsername(false);
      setUsername(inputRef.current.value);
      inputRef.current.value = "";
      navigate("/", { replace: true });
    } else {
      setInvalidUsername(true);
    }
  };

  return (
    <Card className="border w-96 h-96 p-5 flex justify-between flex-col">
      <h1 className="text-2xl font-bold mt-10">login as guest!</h1>

      <form className="w-full mb-10" onSubmit={loginSubmitHandler}>
        <label htmlFor="user-name" className="text-xl my-2 opacity-80">
          username
        </label>
        <input
          type="text"
          className="block bg-transparent border w-5/6 h-16 px-4 mb-2"
          ref={inputRef}
        />
        {invalidUsername && (
          <p className="text-red-500 w-5/6 text-sm">
            username has to be (3-20) characters & only contain (-, _) symbols
          </p>
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
