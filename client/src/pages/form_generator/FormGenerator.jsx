import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios, { all } from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";
import Modal from "react-modal";
import { isUserLoggedIn } from "../../utils/userVerification";
import { clientConfig } from "../../utils/clientConfig";
const FormGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [productsData, setProductsData] = useState([{}]);
  const [isBlack, setIsBlack] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [buttonText,setButtonText]=useState("...טוען")

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    }
    const state = location.state;
    setIsForm(true);
    setFormData(state.formData);
  }, []);

  useEffect(() => {
    if (isForm) fetchData();
  }, [isForm]);

  useEffect(() => {
    const updatedFilterData = productsData.filter((item) => {
      return item.isBlack === isBlack;
    });
    setFilterData(updatedFilterData);
  }, [isBlack, productsData]);

  const fetchData = async () => {
    const token = "Bearer " + Cookies.get("token");
    let company = formData.company;
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
      if (formData.isEditId !== undefined) setButtonText("עריכת קובץ")
      else setButtonText("צור קובץ")

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

      const form = {};
      form.formName = formData.fileName;
      form.company = formData.company;
      form.products = allItems;

      try {
        const token = "Bearer " + Cookies.get("token");
        if (formData.isEditId !== undefined) {
          await axios.put(
            clientConfig.API_PATH + `form/find/${formData.isEditId}`,
            {
              ...form,
            },
            {
              headers: {
                token: token,
              },
            }
          );
        } else {
          await axios.post(
            clientConfig.API_PATH + "form/",
            {
              ...form,
            },
            {
              headers: {
                token: token,
              },
            }
          );
        }

        setIsLoading(false);
        if (formData.isEditId === undefined) alert("הקובץ נוצר בהצלחה");
        else alert("הקובץ עודכן בהצלחה");

        navigate("/admin/home");
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
          {buttonText}
        </button>

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

export default FormGenerator;
