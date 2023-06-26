import React from "react";
import "./homeAdmin.css";
import {
FaUserEdit,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBoxOpen,
  FaPen,
  FaBuilding,
  FaUserSlash,
  FaMinusCircle,
  FaFile
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";

const AdminHome = () => {
  const icons = [
    { icon: FaUserPlus, name: "הוספת משתמש" },
    { icon: FaUserEdit, name: "ערוך משתמש" },
    { icon: FaUserSlash, name: "מחק משתמש" },
    { icon: FaEye, name: "צפייה במשתמשים" },
    { icon: FaFile, name: "צפייה בהזמנות" },
    { icon: FaBoxOpen, name: "הוספת מוצר" },
    { icon: FaPen, name: "עריכת מוצר" },
    { icon: FaMinusCircle, name: "מחיקת מוצר" },
    { icon: FaBuilding, name: "יצירת חברה" },
    { icon: FaEdit, name: "עריכת חברה" },
    { icon: FaTrash, name: "מחיקת חברה" },
  ];

  return (
    <div className="admin-home-container">
      <Navbar />
      <div className="test">
        <div className="admin-content-container">
          {icons.map((item, index) => (
            <div key={index} className="admin-box">
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
