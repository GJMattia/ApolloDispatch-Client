import "./ForgotPW.css";
import { useState, useEffect } from "react";
import { sendCode, resetPW } from "../../../../utilities/user-api";
import axios from "axios";

export default function ForgotPW() {
  let [foundUser, setFoundUser] = useState("");
  let [email, setEmail] = useState("");
  let [page, setPage] = useState(0);
  let [error, setError] = useState("");
  let [userCode, setUserCode] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });

  const changeForm = (evt) => {
    const { name, value } = evt.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handleChange(evt) {
    setEmail(evt.target.value);
  }

  function handleCodeChange(evt) {
    setUserCode(evt.target.value);
  }

  async function code() {
    try {
      let response = await sendCode({ email: email });
      if (!response.error) {
        setFoundUser(response.user);
        setPage(1);
      } else if (response.error) {
        setError("There is no account with this email");
      }
    } catch (error) {
      console.error("error sending code".error);
    }
  }

  async function reset() {
    try {
      let response = await resetPW({
        password: formData.password,
        email: email,
      });
      setPage(3);
    } catch (error) {
      console.error("error sending code".error);
    }
  }

  useEffect(() => {
    if (foundUser) {
      emailCode();
    }
  }, [foundUser]);

  const emailCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4741/email-reset-code",
        {
          email: foundUser.email,
          code: foundUser.code,
        }
      );
      console.log("Email sent successfully:", response.data);
      setError("");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  function checkCodes() {
    if (userCode == foundUser.code) {
      setPage(2);
    } else if (userCode !== foundUser.code) {
      setError("The code does not match.");
    }
  }

  return (
    <div className="ForgotPW">
      {page === 0 && (
        <>
          <h1>Password Reset</h1>
          <p>Please enter your email address</p>
          <input
            className="ResetInput"
            placeholder="Email address"
            minLength="5"
            maxLength="20"
            type="text"
            onChange={handleChange}
            required
          />
          <button
            onClick={code}
            className={`ResetBtn ${!email.includes("@") ? "NotYet" : ""}`}
          >
            Send Code
          </button>
          <p className="Error">{error}</p>
        </>
      )}
      {page === 1 && (
        <>
          <h1>Password Reset</h1>
          <p>Please enter the code that was emailed</p>
          <input
            className="ResetInput2"
            placeholder="4 Digit Code"
            minLength="4"
            maxLength="4"
            type="text"
            required
            onChange={handleCodeChange}
          />
          <button
            onClick={checkCodes}
            className={`ResetBtn ${userCode.length !== 4 ? "NotYet" : ""}`}
          >
            Submit Code
          </button>
          <p className="Error">{error}</p>
        </>
      )}
      {page === 2 && (
        <>
          <h1>Password Reset</h1>
          <p>Choose a new password</p>
          <input
            className="ResetInput"
            minLength="6"
            maxLength="20"
            placeholder="Create a password"
            type="password"
            name="password"
            value={formData.password}
            onChange={changeForm}
            required
          />
          <label
            className={
              formData.password.length === 0
                ? "Grey"
                : formData.password.length < 6
                ? "Red"
                : "Green"
            }
          >
            Password must be 6 characters long
          </label>
          <input
            className="ResetInput"
            minLength="6"
            maxLength="20"
            placeholder="Confirm your password"
            type="password"
            value={formData.confirm}
            onChange={changeForm}
            name="confirm"
            required
          />
          <label
            className={
              formData.confirm.length === 0
                ? "Grey"
                : formData.confirm !== formData.password
                ? "Red"
                : "Green"
            }
          >
            Retype Password
          </label>
          <button
            onClick={reset}
            className={`ResetBtn ${
              formData.password.length < 6 ||
              formData.password !== formData.confirm
                ? "NotYet"
                : ""
            }`}
          >
            Reset Password
          </button>
        </>
      )}

      {page === 3 && (
        <>
          <h1>Success</h1>
          <p>Your password has been reset! </p>
          <p className="Arrow">⬇️</p>
        </>
      )}
    </div>
  );
}
