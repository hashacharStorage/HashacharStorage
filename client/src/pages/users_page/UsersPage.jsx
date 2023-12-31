import React, { useState, useEffect } from "react";
import "./usersPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminList from "../../components/adminList/AdminList";
import { clientConfig } from "../../utils/clientConfig";

const UsersPage = () => {
  const navigate = useNavigate();
  const [allusers, setAlluser] = useState([{}]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = "Bearer " + Cookies.get("token");
      const usersByComp = [];
      try {
        const [companyResponse, usersResponse] = await Promise.all([
          axios.get(clientConfig.API_PATH + "company/all", {
            headers: {
              token: token,
            },
          }),
          axios.get(clientConfig.API_PATH + "users", {
            headers: {
              token: token,
            },
          }),
        ]);

        const companyFields = companyResponse.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        const transformedUsers = companyFields.map((company) => {
          const users = usersResponse.data
            .filter((user) => user.company === company.id)
            .map((user) => ({
              firstName: user.firstname,
              lastName: user.lastname,
              _id: user._id,
              id: user.user_id,
              warehouse: user.warehouse,
            }))
            .sort((a, b) => (a.warehouse > b.warehouse ? 1 : -1));
          return {
            company: company.name,
            users: users,
          };
        });

        setAlluser(transformedUsers);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    const confirmed = window.confirm("האם אתה בטוח שאתה רוצה למחוק את המשתמש?");
    if (confirmed) {
      axios
        .delete(`${clientConfig.API_PATH}users/${id}`, {
          headers: {
            token: token,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          alert("המשתמש נמחק בהצלחה");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditItem = (userId) => {
    navigate(`/edit/user/${userId}`);
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="top-list-container">
          <h1>רשימת משתמשים לפי חברות</h1>
        </div>
        {!isLoading &&
          allusers.map((companyData, index) => (
            <div className="companies-users" key={index}>
              <AdminList
                title={companyData.company}
                items={companyData.users}
                handleRemoveItem={handleRemoveItem}
                handleEditItem={handleEditItem}
                type="users"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
