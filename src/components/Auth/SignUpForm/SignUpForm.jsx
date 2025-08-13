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
    birthday: {
      dd: "",
      mm: "",
      yyyy: "",
    },
    error: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "dd" || name === "mm" || name === "yyyy") {
      if (/^\d*$/.test(value)) {
        let isValid = true;

        if (name === "dd" && (parseInt(value, 10) > 31 || value.length > 2)) {
          isValid = false;
        }

        if (name === "mm" && (parseInt(value, 10) > 12 || value.length > 2)) {
          isValid = false;
        }

        if (isValid) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            birthday: {
              ...prevFormData.birthday,
              [name]: value,
            },
            error: "",
          }));
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
        error: "",
      });
    }
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
          maxLength="20"
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
          maxLength="20"
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
          maxLength="20"
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
          Password must be 6 characters long
        </label>
        <input
          minLength="6"
          maxLength="20"
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
        <p
          className={`BirthTitle ${
            formData.birthday.dd.length === 0 &&
            formData.birthday.mm.length === 0 &&
            formData.birthday.yyyy.length === 0
              ? "Grey"
              : formData.birthday.dd.length === 2 &&
                formData.birthday.mm.length === 2 &&
                formData.birthday.yyyy.length === 4
              ? "Green"
              : "Red"
          }`}
        >
          Please the age of your company
        </p>
        <div className="Birthday">
          <input
            placeholder="MM"
            minLength="2"
            maxLength="2"
            type="text"
            name="mm"
            value={formData.birthday.mm}
            onChange={handleChange}
            required
          />
          <input
            placeholder="DD"
            minLength="2"
            maxLength="2"
            type="text"
            name="dd"
            value={formData.birthday.dd}
            onChange={handleChange}
            required
          />

          <input
            placeholder="YYYY"
            minLength="4"
            maxLength="4"
            type="text"
            name="yyyy"
            value={formData.birthday.yyyy}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className={`SignUpBtn ${
            formData.password.length <= 6 ||
            formData.birthday.yyyy.toString().length !== 4
              ? "NotYet"
              : ""
          }`}
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
