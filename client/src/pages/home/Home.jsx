import React, { useState, useEffect } from "react";
import "./home.css";

import Navbar from "../../components/navbar/Navbar";
import Product from "../../components/product/Product";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
const Home = () => {
  const [productsData, setProductsData] = useState([{}]);
  const [currOrder, setCurrOrder] = useState({});
  const [isBlack, setIsBlack] = useState(true);
  const [filterData, setFilterData] = useState(
    productsData.filter((item) => {
      console.log(item);
      return item.isBlack === isBlack;
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const company = Cookies.get("company");
      const toekn = "Bearer " +  Cookies.get("token");
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            companies: company,
          },
          headers: {
            token: toekn,
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

  const handleEditCurrOrder = (productId, productCounter) => {
    let copyCurrOrder = { ...currOrder, [productId]: productCounter };
    setCurrOrder(copyCurrOrder);
  };
  const handleIsBlack = () => {
    setIsBlack(!isBlack);
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
        <div className="products-list">
          {filterData.map((product, index) => {
            return (
              <Product
                title={product.title}
                serial={product.serial}
                desc={product.desc}
                companies={product.companies}
                minQuantity={product.minQuantity}
                image={product.image}
                black={product.black}
                key={index}
                product_id={product.product_id}
                handleEditCurrOrder={handleEditCurrOrder}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
