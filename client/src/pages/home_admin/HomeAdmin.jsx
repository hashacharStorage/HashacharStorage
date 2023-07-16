import React, { useEffect } from "react";
import "./homeAdmin.css";
import {
  FaUserEdit,
  FaUserPlus,
  FaBoxOpen,
  FaPen,
  FaFile,
} from "react-icons/fa";
import { BsFillBuildingFill, BsBuildingFillAdd } from "react-icons/bs";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {isUserAdmin} from "../../utils/userVerification"

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAdmin()) {
      navigate("/home");
    }
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
      icon: FaFile,
      name: "צפייה בהזמנות",
      function: () => navigate("/add/user"),
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
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
