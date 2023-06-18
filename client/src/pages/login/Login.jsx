import React, { useState } from "react";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let user = {};
  let token = "";

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const isValidEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleClick = async () => {
    if (isValidEmail()) {
      await axios
        .post("http://localhost:5000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          user = res.data.others;
          token = res.data.accessToken;
          Cookies.set("token", token);
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } else {
      alert("invalid email");
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-secondery-container">
        <div className="login-content-container">
          <h1>כניסה למערכת</h1>
          <div className="login-form">
            <input
              type="text"
              placeholder="אימייל"
              value={email}
              onChange={handleEmail}
            />
            <input
              type="password"
              placeholder="סיסמא"
              value={password}
              onChange={handlePassword}
            />
            <div onClick={handleClick} className="submit-button">
              התחברות
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
