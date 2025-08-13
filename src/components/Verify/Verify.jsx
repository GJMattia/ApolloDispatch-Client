import "./Verify.css";
import { useState } from "react";
import axios from "axios";
import { verifyEmail } from "../../../utilities/user-api";
import { useNavigate } from "react-router-dom";

export default function Verify({ user, setUser }) {
  const navigate = useNavigate();

  let [code, setCode] = useState("");
  let [error, setError] = useState("");
  let [page, setPage] = useState(0);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCode(newValue);
  };

  async function verify() {
    try {
      let response = await verifyEmail({ code: code });

      if (response.status) {
        setUser(response.user);
        setPage(2);
      } else if (!response.status) {
        setError("Incorrect Code");
      }
    } catch (error) {
      console.error("error verifying".error);
    }
  }

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4741/send-verification-email",
        {
          email: user.email,
          code: user.code,
        }
      );
      setPage(1);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="Verify">
      <h1>Welcome to Email Verification</h1>

      {page === 0 && (
        <>
          <p>
            Verifying your email is easy! Just click the button below, and
            Apollo Dispatch will send a 4-digit code to the email address you
            provided.
          </p>
          <p>
            If you don’t see the code in your inbox, be sure to check your spam
            folder. Enter the code to unlock all the features of Apollo
            Dispatch!
          </p>
          <button className="VerifyBtn" onClick={sendVerificationEmail}>
            Send 4 digit code to {user.email}!
          </button>
        </>
      )}
      {page === 1 && (
        <>
          <h3>An email has been sent to {user.email}!</h3>
          <p>Please enter the 4 digit code below to complete verification.</p>
          <input
            placeholder="4 Digit Code"
            type="text"
            maxLength="4"
            onChange={handleChange}
          />
          <button
            className={`VerifyBtn ${code.length !== 4 ? "NotYet" : ""}`}
            onClick={verify}
          >
            Submit Code
          </button>
          <p className="Red">{error}</p>
        </>
      )}

      {page === 2 && (
        <>
          <h2 className="Green">Your Email has been verified!</h2>
          <p>
            Thank you for verifying your email address, {user.name}! You now
            have access to various features of Apollo Dispatch, including asset
            voting and Easter egg matchmaking. Enjoy your experience!
          </p>

          <button onClick={() => navigate("/account")} className="VerifyBtn">
            Return to profile
          </button>
        </>
      )}
    </div>
  );
}
