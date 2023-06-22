import React, { useState } from "react";
// import "./register.css";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVila, setSelectedVila] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleSelectedCompany = (event) => {
    setSelectedCompany(event.target.value);
  };
  const handleSelectedVila = (event) => {
    setSelectedVila(event.target.value);
  };
  const handleSelectedTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="body-container">
        <div className="whiteboard-container">
          <div className="register-content-container">
            <h1>רישום טכנאי חדש</h1>
            <div className="register-form">
              <input type="text" placeholder="שם משפחה" />
              <input type="text" placeholder="שם פרטי" />
              <input type="text" placeholder="סיסמא" />
              <input type="text" placeholder="אימייל" />
              <input type="text" placeholder="מידת חולצה" />
              <input type="number" placeholder="מספר מחסן" min="0" />
              <select value={selectedTeam} onChange={handleSelectedTeam}>
                <option value="מרכז">איזור מרכז</option>
                <option value="צפון">איזור צפון</option>
                <option value="דרום">איזור דרום</option>
              </select>
              <select value={selectedVila} onChange={handleSelectedVila}>
                <option value="צוות רגיל">צוות רגיל</option>
                <option value="צוות וילה">צוות וילה</option>
              </select>
              <select value={selectedCompany} onChange={handleSelectedCompany}>
                <option value="cellcom">cellcom</option>
                <option value="yes">yes</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="submit-button">הרשמה</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
