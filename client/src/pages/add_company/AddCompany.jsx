import React, { useState, useEffect } from "react";
import "./addCompany.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";

const AddCompany = () => {
  const [name, setName] = useState("");

  const handlename = (event) => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    const token = "Bearer " + Cookies.get("token");
    try {
      axios
        .post(
          "http://localhost:5000/api/company/register",
          {
            name: name,
          },
          {
            headers: {
              token: token,
            },
          }
        )
        .then(() => {
          alert("החברה התווספה בהצלחה");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) alert(err.response.data.message);
          else alert("אין חיבור לשרת");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="whiteboard-container">
          <h1>הוספת חברה חדשה</h1>
          <div className="add-company-form">
            <input
              type="text"
              placeholder="שם החברה"
              required
              value={name}
              onChange={handlename}
            />
          </div>
          <SubmitButton title={"הוספת חברה"} oncllickhandle={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
