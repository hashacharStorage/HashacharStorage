import React, { useState, useEffect } from "react";
import "./addCompany.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";
const AddCompany = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAdmin()) {
      navigate("/home");
    }
  }, [navigate]);

  const handlename = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const isValidEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const onSubmit = () => {
    if (isValidEmail()) {
      const token = "Bearer " + Cookies.get("token");
      try {
        axios
          .post(
            clientConfig.API_PATH + "company/register",
            {
              name: name,
              email: email.toLowerCase(),
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
    } else {
      alert("invalid email");
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
            <input
              type="text"
              placeholder="אימייל לקבלת הזמנה"
              required
              defaultValue={email}
              onChange={handleEmail}
            />
          </div>
          <SubmitButton title={"הוספת חברה"} oncllickhandle={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
