import React, { useState, useEffect } from "react";
import "./usersPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserList from "../../components/userList/UserList";

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
          axios.get("http://localhost:5000/api/company/all", {
            headers: {
              token: token,
            },
          }),
          axios.get("http://localhost:5000/api/users", {
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
            }));

          return {
            company: company.name,
            users: users,
          };
        });

        setAlluser(transformedUsers);
        setIsloading(false);
        console.log(transformedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveUser = async (id) => {
    const token = "Bearer " + Cookies.get("token");
    axios
      .delete(`http://localhost:5000/api/users/${id}`, {
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
  };

  const handleEditUser = (userId) => {
    navigate(`/edit/user/${userId}`);
  };

  return (
    <div className="users-page-container">
      <Navbar />
      <div className="users-page-content-container">
        <div className="top-list-container">
          <h1>רשימת משתמשים לפי חברות</h1>
        </div>
        {!isLoading &&
          allusers.map((companyData, index) => (
            <div className="companies-users" key={index}>
              <h2>{companyData.company}</h2>
              <UserList
                users={companyData.users}
                handleRemoveUser={handleRemoveUser}
                handleEditUser={handleEditUser}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
