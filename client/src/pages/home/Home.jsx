import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";
import { clientConfig } from "../../utils/clientConfig";
import Modal from "react-modal";

const Home = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([{}]);
  const [isBlack, setIsBlack] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updatedFilterData = productsData.filter((item) => {
      return item.isBlack === isBlack;
    });
    setFilterData(updatedFilterData);
  }, [isBlack, productsData]);

  const fetchData = async () => {
    const token = "Bearer " + Cookies.get("token");
    const company = Cookies.get("company");

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${clientConfig.API_PATH}products/${company}`,
        {
          params: {
            company: company,
          },
          headers: {
            token: token,
          },
        }
      );
      setIsLoading(false);
      setProductsData(response.data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleIsBlack = () => {
    setIsBlack(!isBlack);
  };

  const handleFinishOrder = async () => {
    if (localStorage.length !== 0) {
      setIsLoading(true);

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
        await axios.post(
          clientConfig.API_PATH + "orders/",
          {
            ...order,
          },
          {
            headers: {
              token: token,
            },
          }
        );

        setIsLoading(false);
        alert("הזמנתך נשלחה למחסן בהצלחה");
        navigate("/home");
        window.scrollTo(0, 0);
      } catch (error) {
        setIsLoading(false);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="top-list-container">
          <button
            className={`switch-button ${!isBlack ? "active" : ""}`}
            onClick={handleIsBlack}
          >
            ציוד סיריאלי
          </button>
          <button
            className={`switch-button ${isBlack ? "active" : ""}`}
            onClick={handleIsBlack}
          >
            ציוד שחור
          </button>
        </div>
        <ProductsList products={filterData} />
        <button
          onClick={handleFinishOrder}
          className="complete-order-button"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "שליחת פריטים"}
        </button>

        {/* Loading Modal */}
        <Modal
          isOpen={isLoading}
          contentLabel="Loading Modal"
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "none",
            },
          }}
        >
          <div className="loading-animation">
            <div className="loading-spinner"></div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
