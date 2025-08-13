import { useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import ForgotPW from "../ForgotPW/ForgotPW";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [auth, setAuth] = useState(0);
  return (
    <div className="AuthPage">
      <div className="AuthHeader">
        <p>{auth === 1 ? "Already signed up?" : "New here?"}</p>
        <p className="AuthLink" onClick={() => setAuth(auth === 1 ? 0 : 1)}>
          {auth === 1 ? "Log In" : "Sign Up"}
        </p>
      </div>
      {auth === 0 && <LoginForm setUser={setUser} />}
      {auth === 1 && <SignUpForm setUser={setUser} />}
      {auth === 2 && <ForgotPW />}

      {(auth === 0 || auth === 2) && (
        <p className="Forgot" onClick={() => setAuth(auth === 2 ? 0 : 2)}>
          {auth === 2 ? "Remember? Sign In" : "Forgot Password?"}
        </p>
      )}
    </div>
  );
}
