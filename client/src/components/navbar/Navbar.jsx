import React from "react";
import "./navbar.css";
import logo from "../../images/logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const name = Cookies.get("firstName");
  const company=Cookies.get("company")
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("company");
    Cookies.remove("firstName");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <img src={logo} onClick={() =>{ company==0?navigate("/admin/home"):navigate("/home")}} />
      {pathName !== "/login" && (
        <ul>
          <p>שלום {name}</p>
          <li>
            <p
              className="navbar-links"
              onClick={() => navigate(`/find/order/${Cookies.get("id")}`)}
            >
              צפייה בהזמנה אחרונה
            </p>
          </li>
          <li>
            <p className="navbar-links">עדכון פרטים</p>
          </li>
          <li>
            <p className="navbar-links" onClick={() => logout()}>
              התנתקות
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
