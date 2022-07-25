import React, { useCallback, useEffect, useRef, useState } from "react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import useLocalStorage from "../hooks/useLocalStorage";

const GENERIC_ERROR = {
  status: false,
  message: "something went wrong",
};

const USERNAME_ERROR = {
  status: false,
  message: "username has to be (4-30) characters & only contain (- _) symbols",
};
const EMAIL_ERROR = {
  status: false,
  message: "not a valid email",
};
const PASSWORD_ERROR = {
  status: false,
  message:
    "password too short or too long, valid password is (8-80) characters",
};
const CONFIRM_PASSWORD_ERROR = {
  status: false,
  message: "confirm password doesn't match password",
};
function SignupForm() {
  const [_, setUser] = useAuth();
  const [_2, setToken] = useLocalStorage("access_token");
  const [validUsername, setValidUsername] = useState(null);
  const [validEmail, setValidEmail] = useState(null);
  const [validPassword, setValidPassword] = useState(null);
  const [validConfirmPassword, setValidConfirmPassword] = useState(null);
  const [serverError, setServerError] = useState(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const id = useId();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const usernameValidator = useCallback((username) => {
    const reg = /^[a-zA-Z0-9_-]{4,30}$/;
    return reg.test(username);
  }, []);
  const emailValidator = useCallback((email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    return reg.test(email);
  });
  const passwordValidator = useCallback((password) => {
    return password.length >= 8 && password.length <= 80;
  });
  const confirmPasswordValidator = useCallback((password, confirmPassword) => {
    return password === confirmPassword;
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setServerError({ status: true });
    setValidUsername(() => {
      if (usernameValidator(usernameRef.current.value.trim())) {
        return { status: true };
      } else {
        return USERNAME_ERROR;
      }
    });
    setValidEmail(() => {
      if (emailValidator(emailRef.current.value.trim())) {
        return { status: true };
      } else {
        return EMAIL_ERROR;
      }
    });
    setValidPassword(() => {
      if (passwordValidator(passwordRef.current.value)) {
        return { status: true };
      } else {
        return PASSWORD_ERROR;
      }
    });
    setValidConfirmPassword(() => {
      if (
        confirmPasswordValidator(
          passwordRef.current.value,
          confirmPasswordRef.current.value
        )
      ) {
        return { status: true };
      } else {
        return CONFIRM_PASSWORD_ERROR;
      }
    });
    const isValid =
      usernameValidator(usernameRef.current.value.trim()) &&
      emailValidator(emailRef.current.value.trim()) &&
      passwordValidator(passwordRef.current.value) &&
      confirmPasswordValidator(
        passwordRef.current.value,
        confirmPasswordRef.current.value
      );

    try {
      if (isValid) {
        const res = await fetch("/api/users/register", {
          method: "POST",
          body: JSON.stringify({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
        });
        const resJson = await res.json();
        if (res.status >= 500) {
          setServerError({ status: false, message: "Server error." });
        }
        if (res.status !== 201) {
          setServerError(GENERIC_ERROR);
        }
        if (resJson.token) {
          console.log(resJson);
          setServerError({ status: true, message: "success" });
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
        confirmPasswordRef.current.value = "";
      }
    } catch (error) {
      setServerError(GENERIC_ERROR);
      console.error(error);
    }
  };

  const inputStyle =
    "border-customLightOrange bg-customTrans1 focus:border-customLightBlue focus:bg-customTrans05 mb-2 block h-10 w-5/6 border px-4 outline-none focus:border";

  return (
    <div className="flex w-96 flex-col  items-center justify-between border border-customLightOrange bg-customTrans05  px-5 py-3">
      <h1 className="mt-10 mb-6 text-4xl font-bold text-cutsomYellow">
        Join SeaCord now!
      </h1>

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
        <label htmlFor={"email-" + id} className="my-2 text-2xl">
          email
        </label>
        <input
          type="email"
          id={"email-" + id}
          className={inputStyle}
          ref={emailRef}
        />
        <label htmlFor={"password- " + id} className="my-2 text-2xl">
          password
        </label>
        <input
          type="password"
          id={"password- " + id}
          className={inputStyle}
          ref={passwordRef}
        />
        <label htmlFor={"confirm-password-" + id} className="my-2 text-2xl">
          confirm password
        </label>
        <input
          type="password"
          id={"confirm-password-" + id}
          className={inputStyle}
          ref={confirmPasswordRef}
        />

        <button
          type="submit"
          className="mt-10 w-5/6  border border-customLightOrange bg-customTrans05 p-3 text-customLightOrange hover:border-customLightBlue hover:bg-customBlue"
        >
          start chatting
        </button>
      </form>
      {validUsername?.status === false && (
        <p className="text-md w-5/6  font-semibold text-red-500">
          -{validUsername?.message}
        </p>
      )}
      {validEmail?.status === false && (
        <p className="text-md w-5/6  font-semibold text-red-500">
          -{validEmail?.message}
        </p>
      )}
      {validPassword?.status === false && (
        <p className="text-md w-5/6  font-semibold text-red-500">
          -{validPassword?.message}
        </p>
      )}
      {validConfirmPassword?.status === false && (
        <p className="text-md w-5/6  font-semibold text-red-500">
          -{validConfirmPassword?.message}
        </p>
      )}
      {serverError?.status === false && (
        <p className="text-md w-5/6  font-semibold text-red-500">
          -{serverError?.message}
        </p>
      )}
    </div>
  );
}

export default SignupForm;
