import React, { useState } from "react";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { clientConfig } from "../../utils/clientConfig";

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
    return emailRegex.test(email.trim());
  };

  const handleClick = async () => {
    if (isValidEmail()) {
      await axios
        .post(clientConfig.API_PATH + "auth/login", {
          email: email.toLowerCase().trim(),
          password: password,
        })
        .then((res) => {
          user = res.data.others;
          token = res.data.accessToken;
          Cookies.set("token", token);
          Cookies.set("company", user.company);
          Cookies.set("firstName", user.firstname);
          Cookies.set("id", user._id);
          if (user.company == 0) navigate("/admin/home");
          else navigate("/home");
        })
        .catch((err) => alert(err.response.data.msg));
    } else {
      alert("invalid email");
    }
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="login-container">
        <div className="whiteboard-container">
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
            <SubmitButton title="התחברות" oncllickhandle={handleClick}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
