import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.png";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const name = Cookies.get("firstName");
  const company = parseInt(Cookies.get("company"), 10); // Convert to number with base 10
  const userId = Cookies.get("id");
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
    <div className={isMenuOpen ? "navbar-container" : "navbar-container-closed"}>
      <img
        src={logo}
        alt="Logo"
        onClick={() => {
          if (pathName !== "/login") {
            company === 0 ? navigate("/admin/home") : navigate("/home");
          }
        }}
      />
      {pathName !== "/login" && (
        <ul>
          <p>שלום {name}</p>
          {company !== 0 && (
            <>
              <li>
                <Link className="navbar-links" to={`/find/order/${userId}`}>
                  צפייה בהזמנה אחרונה
                </Link>
              </li>
              <li>
                <Link className="navbar-links" to={`/edit/user/${userId}`}>
                  עריכת פרטי משתמש
                </Link>
              </li>
            </>
          )}
          <li>
            <span className="navbar-links" onClick={() => logout()}>
              התנתקות
            </span>
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
  );
};

export default Navbar;
