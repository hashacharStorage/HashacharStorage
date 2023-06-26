import React, { useEffect, useState } from "react";
import "./lastOrder.css";
import ProductsList from "../../components/productsList/ProductsList";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";

const LastOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/find/${userId}`, {
        headers: {
          token: "Bearer "+Cookies.get("token"),
        },
      })
      .then((response) => setOrderList(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <ProductsList products={orderList} viewOnly={true}/>
    </>
  );
};

export default LastOrder;
