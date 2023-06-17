import React from "react";
import "./navbar.css";
import logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} />
      <ul>
        <li>
          <p className="navbar-links">צפייה בהזמנה אחרונה</p>
        </li>
        <li>
          <p className="navbar-links">עדכון פרטים</p>
        </li>
        <li>
          <p className="navbar-links">התנתקות</p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
