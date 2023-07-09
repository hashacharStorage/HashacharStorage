import React, { useState, useEffect } from "react";
import "./companiesPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [companies,setCompanies]=useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companiesResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/company/all", {
            headers: {
              token: token,
            },
          }),
        ]);

        const companies = companiesResponse.data;
        companies.shift();

        setCompanies(companies);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const handleRemoveItem = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    const confirmed = window.confirm(
      "?האם אתה בטוח שאתה רוצה למחוק את החברה והעובדים שלה"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:5000/api/company/find/${id}`, {
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
        .catch((err) => {if(err.response)alert(err.response.data)
        else alert("אין חיבור לשרת")});
    }
  };

  const handleEditItem = (productId) => {
    navigate(`/edit/company/${productId}`);
  };



  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <h1>רשימת חברות</h1>
        {!isLoading && (
          <AdminList
            title={"רשימת חברות"}
            items={companies}
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            type="companies"
          />
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
