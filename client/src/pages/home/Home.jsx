import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";

const Home = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([{}]);
  const [isBlack, setIsBlack] = useState(true);
  const [filterData, setFilterData] = useState(
    productsData.filter((item) => {
      return item.isBlack === isBlack;
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      if (
        Cookies.get("token") === undefined ||
        Cookies.get("company") === undefined
      )
        navigate("/login");

      const token = "Bearer " + Cookies.get("token");
      const company = Cookies.get("company");
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            companies: company,
          },
          headers: {
            token: token,
          },
        });
        setProductsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatedFilterData = productsData.filter((item) => {
      return item.isBlack === isBlack;
    });
    setFilterData(updatedFilterData);
  }, [isBlack, productsData]);

  const handleIsBlack = () => {
    setIsBlack(!isBlack);
  };

  const handlefinishOrder = () => {
    const allItems = {};
    const keysToRemove = [];
    console.log(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.split("-")[0] !== "product") {
        continue;
      } else {
        const value = localStorage.getItem(key);
        allItems[key.split("-")[1]] = value;
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    console.log(allItems);
    alert("הזמנתך נשלחה למחסן בהצלחה")
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-container">
        <div className="top-list-container">
          <div className="search">
            <input className="input" type="text" placeholder="חיפוש" />
            <BiSearchAlt className="search-icon" />
          </div>
          <div className={"switch-button"} onClick={handleIsBlack}>
            {isBlack ? "ציוד שחור" : "ציוד סיריאלי"}
          </div>
        </div>
        <ProductsList products={filterData} />
        <button
          onClick={() => handlefinishOrder()}
          className="complete-order-button"
        >
          שליחת פריטים
        </button>
      </div>
    </div>
  );
};

export default Home;
