import { useState } from "react";
import { signUp } from "../../../../utilities/user-services";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
      error: "",
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { error, confirm, ...data } = formData;
      const user = await signUp(data);
      setUser(user);
      navigate("/vehicles");
    } catch (error) {
      setFormData({ ...formData, error: "Sign Up Failed - Try Again" });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <form className="SignUpForm" autoComplete="off" onSubmit={handleSubmit}>
        <input
          minLength="3"
          maxLength="30"
          placeholder="Enter your DSP name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label
          className={
            formData.name.length === 0
              ? "Grey"
              : formData.name.length > 0 && formData.name.length < 3
              ? "Red"
              : "Green"
          }
        >
          Username must be at least 3 characters long
        </label>
        <input
          minLength="5"
          maxLength="30"
          placeholder="Your email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label
          className={
            formData.email.length === 0
              ? "Grey"
              : !formData.email.includes("@")
              ? "Red"
              : !/(\.com|\.net)$/.test(formData.email)
              ? "Red"
              : "Green"
          }
        >
          Please Enter a valid Email
        </label>
        <input
          minLength="6"
          maxLength="30"
          placeholder="Create a password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          Password must be 6 characters long minimum
        </label>
        <input
          minLength="6"
          maxLength="30"
          placeholder="Confirm your password"
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
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
          className={`SignUpBtn ${formData.password.length}`}
          type="submit"
          disabled={disable}
        >
          Create My Account
        </button>
      </form>
      <p className="Error2">{formData.error}</p>
    </>
  );
}
