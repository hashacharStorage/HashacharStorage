import React, { useState, useEffect } from "react";
import "./home.css";

import Navbar from "../../components/navbar/Navbar";
import Product from "../../components/product/Product";
import { BiSearchAlt } from "react-icons/bi";



const Home = () => {
  const dumyData = [
    {
      product_id: 0,
      title: "ממיר",
      serial: "12",
      desc: "ממיר",
      companies: [0, 1],
      image:
        "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2020/01/20210816_112730.jpg",
      minQuantity: 1,
      black: false,
    },
    {
      product_id: 1,
      title:
        "Armored  C LC/APC-SC/APC SS Simplex 3.0mm LSZH Anti-UV-30MArmored  C LC/APC-SC/APC SS Simplex 3.0mm LSZH Anti-UV-40MArmored  C LC/APC-SC/APC SS Simplex 3.0mm LSZH Anti-UV-40MArmored  C LC/APC-SC/APC SS Simplex 3.0mm LSZH Anti-UV-40M      ",
      serial: "23",
      desc: "ממיר",
      companies: [0, 1],
      image:
        "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2020/01/20210816_112730.jpg",

      minQuantity: 1,
      black: true,
    },
    {
      product_id: 2,
      title: "ממיר",
      serial: "123451dd2a56",
      desc: "ממיר",
      companies: [0, 1],
      image:
        "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2020/01/20210816_112730.jpg",

      minQuantity: 8,
      black: false,
    },
  ];

  const [currOrder, setCurrOrder] = useState({});
  const [isBlack, setIsBlack] = useState(true);
  const [filterData, setFilterData] = useState(
    dumyData.filter((item) => {
      return item.black === isBlack;
    })
  );

  useEffect(() => {
    const updatedFilterData = dumyData.filter((item) => {
      return item.black === isBlack;
    });
    setFilterData(updatedFilterData);
  }, [isBlack]);

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
            <input className="input" type="text" placeholder="חיפוש"/>
            <BiSearchAlt className="search-icon"/>
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
