import React, { useEffect, useState } from "react";
import "./lastOrder.css";
import ProductsList from "../../components/productsList/ProductsList";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/userVerification";
import { useNavigate } from "react-router-dom";

const LastOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          axios.get(`http://localhost:5000/api/users/find/${userId}`, {
            headers: {
              token: "Bearer " + Cookies.get("token"),
            },
            params: {
              id: userId,
            },
          }),
          axios.get("http://localhost:5000/api/company/all"),
          axios.get(`http://localhost:5000/api/orders/find/${userId}`, {
            headers: {
              token: "Bearer " + Cookies.get("token"),
            },
          }),
        ];

        const [userResponse, companyResponse, orderResponse] =
          await Promise.all(promises);

        const user = userResponse.data;
        const companyId = user.company;
        const company = companyResponse.data.find((c) => c.id === companyId);

        setUser({ ...user, company: company ? company.name : "" });
        setOrderList(orderResponse.data.products);

        const date = new Date(orderResponse.data.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB");
        setDate(formattedDate);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isUserLoggedIn()) {
      navigate("/login");
    } else fetchData();
  }, []);

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <h1>הזמנה מתאריך: {date}</h1>
        <ProductsList products={orderList} viewOnly={true} />
      </div>
    </div>
  );
};

export default LastOrder;
