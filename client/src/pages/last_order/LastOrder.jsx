import React, { useEffect, useState } from "react";
import "./lastOrder.css";
import ProductsList from "../../components/productsList/ProductsList";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";

const LastOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [date, setDate] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/find/${userId}`, {
        headers: {
          token: "Bearer " + Cookies.get("token"),
        },
      })
      .then((response) => {
        console.log(response.data.createdAt)
        setOrderList(response.data.products);
        setDate(response.data.createdAt.split("T")[0]);
//         const date = new Date(dateString);
// const formattedDate = date.toLocaleDateString("en-GB");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-container">
        <h1>הזמנה מתאריך: {date}</h1>
        <ProductsList products={orderList} viewOnly={true} />
      </div>
    </div>
  );
};

export default LastOrder;
