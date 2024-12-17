import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputContainer from "./InputContainer";
import CartContext from "./CartContext";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    generalError: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn, syncCartToDatabase } = useContext(CartContext);

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
    } else {
      return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    if (errors[name]) {
      setErrors((prevErr) => ({
        ...prevErr,
        [name]: "",
      }));
    } else if (errors.generalError) {
      setErrors((prevErr) => ({
        ...prevErr,
        generalError: "",
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setErrors((prevErr) => {
      let newErrors = { ...prevErr };
      if (name === "email") {
        newErrors.email = validateEmail(value);
      } else if (name === "password") {
        newErrors.password = validatePassword(value);
      }
      return newErrors;
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = user;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
    } else {
      try {
        const response = await axios.post("/api/user/login", user, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.userName);
          navigate("/");
          await syncCartToDatabase();
          setIsLoggedIn(true);
        }
      } catch (err) {
        const { message } = err.response?.data || {};
        setErrors({
          generalError: message || "An unexpected error occurred.",
        });
      }
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      {errors.generalError && (
        <span className="span-errors general-error">{errors.generalError}</span>
      )}
      <form onSubmit={handleSubmit}>
        <InputContainer
          onChange={handleChange}
          name="email"
          type="email"
          label="Email"
          value={user.email}
          errors={errors.email}
          onBlur={handleBlur}
        />
        <InputContainer
          onChange={handleChange}
          name="password"
          type="password"
          label="Password"
          value={user.password}
          errors={errors.password}
          onBlur={handleBlur}
        />
        <button className="submitBtn" type="submit">
          Continue
        </button>
      </form>
      <Link to="/register" className="toggleBtn">
        New User? Create an account
      </Link>
    </div>
  );
};

export default LoginForm;
