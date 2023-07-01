import React, { useState, useEffect } from "react";
import "./editCompany.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../../components/submit_button/SubmitButton";
import { useParams } from "react-router-dom";

const EditCompany = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/company/find/${id}`),
        ]);

        setName(companyResponse.data.name);
        setOriginalName(companyResponse.data.name);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handlename = (event) => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    const token = "Bearer " + Cookies.get("token");
    if (name !== originalName) {
      try {
        axios
          .put(
            `http://localhost:5000/api/company/find/${id}`,
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
            alert("הפרטים נערכו בהצלחה");
            window.location.reload();
          })
          .catch((err) => {
            if (err.response) alert(err.response.data.message);
            else alert("אין חיבור לשרת");
          });
      } catch (error) {
        console.log(error);
      }
    } else alert("לא בוצעו שינויים");
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="whiteboard-container">
        <h1>הוספת חברה חדשה</h1>
        <div className="edit-company-form">
          {!isLoading && (
            <input
              type="text"
              placeholder="שם החברה"
              required
              defaultValue={name}
              onChange={handlename}
            />
          )}
        </div>
        <SubmitButton title={"הוספת חברה"} oncllickhandle={onSubmit} />
      </div>
    </div>
  );
};

export default EditCompany;
