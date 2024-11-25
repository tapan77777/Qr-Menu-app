import React, { useState } from "react";
import "./LoginPage.css";

const LoginForm = () => {
  const logInForm = { uName: "", pass: "" };
  const [loginCred, setLoginCred] = useState(logInForm);
  const [formErrorMsg, setFormErrorMsg] = useState("Please log in");

  const handleUserName = (e) => {
    setLoginCred({ ...loginCred, uName: e.target.value });
  };

  const handlePassword = (e) => {
    setLoginCred({ ...loginCred, pass: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCred.uName === "admin") {
      if (loginCred.pass === "Admin") {
        window.location.href = "/admin";
      } else {
        setFormErrorMsg("Entered Password is wrong");
      }
    } else {
      setFormErrorMsg("Entered UserName is wrong");
    }
    setLoginCred({ uName: "", pass: "" });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <h2>Admin Login</h2>
        <p className="error-msg">{formErrorMsg}</p>
        <input
          type="text"
          placeholder="User Name"
          onChange={handleUserName}
          value={loginCred.uName}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={loginCred.pass}
        />
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
