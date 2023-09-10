import React, { useEffect, useState } from "react";
import "./homeAdmin.css";
import { FaUserEdit, FaUserPlus, FaBoxOpen, FaPen } from "react-icons/fa";
import {
  BsFillBuildingFill,
  BsBuildingFillAdd,
  BsFileArrowUpFill,
  BsFillFileArrowDownFill,
} from "react-icons/bs";
import FormDetailsModal from "../../components/form_details_modal/FormDetailsModal";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../utils/userVerification";
import Cookies from "js-cookie";
import axios from "axios";
import { clientConfig } from "../../utils/clientConfig";

const AdminHome = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigateCreateForm = (data) => {
    navigate("/admin/form-generator", { state: { formData: data } }); // Navigate to the home page and pass the data
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      try {
        const [companiesResponse, productsResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "company/all", {
            headers: {
              token: token,
            },
          }),
        ]);

        const companies = companiesResponse.data;
        companies.shift();

        setCompanies(companies);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isUserAdmin()) {
      navigate("/home");
    } else fetchData();
  }, [navigate]);

  const icons = [
    {
      icon: FaUserPlus,
      name: "הוספת משתמש",
      function: () => navigate("/add/user"),
    },
    {
      icon: FaUserEdit,
      name: "פעולות על משתמשים קיימים",
      function: () => navigate("/admin/users"),
    },
    {
      icon: FaBoxOpen,
      name: "הוספת מוצר",
      function: () => navigate("/add/product"),
    },
    {
      icon: FaPen,
      name: "פעולות על מוצרים קיימים",
      function: () => navigate("/admin/products"),
    },
    {
      icon: BsBuildingFillAdd,
      name: "יצירת חברה",
      function: () => navigate("/add/company"),
    },
    {
      icon: BsFillBuildingFill,
      name: "פעולות על חברות קיימות",
      function: () => navigate("/admin/companies"),
    },
    {
      icon: BsFileArrowUpFill,
      name: "יצירת טופס חדש",
      function: () => handleFormModal(),
    },
    {
      icon: BsFillFileArrowDownFill,
      name: "הורדת טפסים ",
      function: () => navigate("/admin/forms"),
    },
  ];

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="admin-panel">
          {icons.map((item, index) => (
            <div key={index} className="admin-box" onClick={item.function}>
              <item.icon className="admin-icon" />
              <span className="admin-name">{item.name}</span>
            </div>
          ))}
          {isModalOpen && (
            <FormDetailsModal
              companies={companies}
              isOpen={true}
              onClose={handleFormModal}
              onSave={navigateCreateForm}
              isEdit={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
