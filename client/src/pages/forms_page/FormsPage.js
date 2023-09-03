import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";
import { isUserAdmin } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";

const FormsPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [formsResponse,] = await Promise.all([
          axios.get(clientConfig.API_PATH + "form", {
            headers: {
              token: token,
            },
          }),
        ]);
        const forms = formsResponse.data;
        setForms(forms);
        console.log(forms)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isUserAdmin()) {
      navigate("/home");
    } else fetchData();
  }, []);

  const handleRemoveItem = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    const confirmed = window.confirm(
      "האם אתה בטוח שאתה רוצה למחוק את הטופס?"
    );
    if (confirmed) {
      axios
        .delete(`${clientConfig.API_PATH}form/find/${id}`, {
          headers: {
            token: token,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          alert("החברה ועובדיה נמחקו בהצלחה");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) alert(err.response.data);
          else alert("אין חיבור לשרת");
        });
    }
  };

  const handleEditItem = (productId) => {
    console.log("first")
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <h1>רשימת טפסים</h1>
        {!isLoading && (
          <AdminList
            items={forms}
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            type="forms"
          />
        )}
      </div>
    </div>
  );
};

export default FormsPage;
