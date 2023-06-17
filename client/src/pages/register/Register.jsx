import React from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  return (
    <div className="register-container">
      <Navbar />
      <div className="register-content-container">
        <h1>רישום טכנאי חדש</h1>
        <div className="register-form">
          <div className="form-field">
            <input type="text" placeholder="שם פרטי" />
            <h3>:שם פרטי</h3>
          </div>
          <div className="form-field">
            <input type="text" placeholder="שם משפחה" />
            <h3>:שם משפחה</h3>
          </div>
          <div className="form-field">
            <input type="text" placeholder="אימייל" />
            <h3>:אימייל</h3>
          </div>
          <div className="form-field">
            <input type="text" placeholder="סיסמא" />
            <h3>:סיסמא</h3>
          </div>
          <div className="form-field">
            <input type="number" placeholder="מספר מחסן"  min="0"/>
            <h3>:מספר מחסן</h3>
          </div>
          <div className="submit-button">submit</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
