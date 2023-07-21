import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const name = Cookies.get("firstName");
  const company = Cookies.get("company");
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("company");
    Cookies.remove("firstName");
    Cookies.remove("id");
    navigate("/login");
  };

  const navbarClickHandler = () => {
    setIsMenuOpen((current) => !current);
  };

  return (
    <div className="navbar">
      <div
        className={isMenuOpen ? "navbar-container": "navbar-container-closed"}
      >
        <img
          src={logo}
          onClick={() => {
            company == 0 ? navigate("/admin/home") : navigate("/home");
          }}
        />
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
              <p className="navbar-links" onClick={() => logout()}>
                התנתקות
              </p>
            </li>
          </ul>
        )}
        {isMenuOpen ? (
          <BsArrowRightCircleFill
            className="navbar-icon-right"
            onClick={() => navbarClickHandler()}
          />
        ) : (
          <BsArrowLeftCircleFill
            className="navbar-icon-left"
            onClick={() => navbarClickHandler()}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
