import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputContainer from "./InputContainer";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s+_@-]+@[^\s+_@-]+\.[^\s+_@-]+$/;
    if (!email) {
      return "Email is required";
    } else if (!regex.test(email)) {
      return "Please enter a valid email address";
    } else {
      return "";
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be atleast 8 characters long";
    } else {
      return "";
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Confirm Password is required";
    } else if (password !== confirmPassword) {
      return "Passwords do not match";
    } else {
      return "";
    }
  };

  const handleChange = (event) => {
    console.log("input change");
    const { name, value } = event.target;
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    if (name === "email") {
      setErrors((prevErr) => {
        return {
          ...prevErr,
          email: validateEmail(value),
        };
      });
    }

    if (name === "password") {
      setErrors((prevErr) => {
        return {
          ...prevErr,
          password: validatePassword(value),
        };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = user;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
    } else {
      try {
        const result = await axios.post("/api/auth/register", {
          email: user.email,
          password: user.password,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log("result",result);
        setUser({
          email: "",
          password: "",
          confirmPassword: ""
        })
      } catch (err) {
        console.log("Error caught while registering:", err);
        setErrors((prevErr) => {
          return {
            ...prevErr,
            email: err.response.data.message
          }
        });
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Create your account</h2>
      <form onSubmit={handleSubmit}>
        <InputContainer
          onChange={handleChange}
          name="email"
          type="email"
          label="Email"
          value={user.email}
          errors={errors.email}
        />
        <InputContainer
          onChange={handleChange}
          name="password"
          type="password"
          label="Password"
          value={user.password}
          errors={errors.password}
        />
        <InputContainer
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={user.confirmPassword}
          errors={errors.confirmPassword}
        />
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
      <Link to="/login">Already existing user? Login</Link>
    </div>
  );
};

export default RegistrationForm;
