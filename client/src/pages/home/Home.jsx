import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";
import { isUserLoggedIn } from "../../utils/userVerification";

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
      const token = "Bearer " + Cookies.get("token");
      const company = Cookies.get("company");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${company}`,
          {
            params: {
              company: company,
            },
            headers: {
              token: token,
            },
          }
        );
        setProductsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if(isUserLoggedIn()){
      fetchData()
    }else navigate("/login");
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

  const handlefinishOrder = async () => {
    if (localStorage.length !== 0) {
      const allItems = [];
      let item = {};
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.split("-")[0] !== "product") {
          continue;
        } else {
          const value = localStorage.getItem(key);
          item.productId = Number(key.split("-")[1]);
          item.quantity = value;
          allItems.push(item);
          item = {};
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
      const order = {};
      order.products = allItems;
      order.userId = Cookies.get("id");
      const token = "Bearer " + Cookies.get("token");
      try {
        axios
          .post(
            "http://localhost:5000/api/orders/",
            {
              ...order,
            },
            {
              headers: {
                token: token,
              },
            }
          )
          .then(() => {
            alert("הזמנתך נשלחה למחסן בהצלחה");
            window.location.reload();
          });
      } catch (error) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="top-list-container">
          <div className="switch-button" onClick={handleIsBlack}>
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
