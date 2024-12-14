import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputContainer from "./InputContainer";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateUserName = (userName) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9_@$!]{2,9}$/;
    if (!userName) {
      return "Username is required";
    } else if (userName.length < 3 || userName.length > 10){
      return "Username should contain min(3) and max(10) characters";
    } else if (!regex.test(userName)) {
      return "Please enter a valid username (a-z, A-Z, 0-9, _, @, $, !)";
    } else {
      return "";
    }
  }

  const validateEmail = (email) => {
    const regex = /^[^\s+_@-]+@[^\s+_@-]+\.[^\s+_@-]+$/;
    if (!email) {
      return "Email is required";
    } else if (!regex.test(email)) {
      return "Please enter a valid email address(Ex: hello@gmail.com)";
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
    const { name, value } = event.target;
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    if(name === "Username") {
      setErrors((prevErr) => {
        return {
          ...prevErr,
          userName: validateUserName(value),
        };
      });
    }

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
    const { userName, email, password, confirmPassword } = user;
    const userNameError = validateUserName(userName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (userNameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        userName: userNameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
    } else {
      try {
        const result = await axios.post(
          "/api/user/register",
          {
            userName: user.userName,
            email: user.email,
            password: user.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if(result.status === 201) {
          setUser({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
          setTimeout(() => {
            alert("Your Account has been created successfully. Please Login");
          }, 100);
        }
      } catch (err) {
        setErrors({
          email: err.response.data.error,
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
          name="userName"
          type="text"
          label="Username"
          value={user.userName}
          errors={errors.userName}
        />
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
      <Link to="/login" className="toggleBtn">
        Already existing user? Login
      </Link>
    </div>
  );
};

export default RegistrationForm;
