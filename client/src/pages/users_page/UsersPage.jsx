import React, { useState, useEffect } from "react";
import "./usersPage.css";
import Navbar from "../../components/navbar/Navbar";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/userList/UserList";

const UsersPage = () => {
  const fakeUsers = [
    {
      company: "cellcom",
      users: [
        { firstName: "לירם", lastName: "גוליברודה", _id: 1, warehouse: 1 },
        // Add more users for Company A
      ],
    },
    {
      company: "yes",
      users: [
        { firstName: "ניב", lastName: " ביבי", _id: 2, warehouse: 2 },
        // Add more users for Company B
      ],
    },
  ];

  const handleRemoveUser = (userId) => {
    // Implement your logic to remove the user here
    console.log("Removing user with ID:", userId);
  };

  const handleEditUser = (userId) => {
    // Implement your logic to edit the user here
    console.log("Editing user with ID:", userId);
  };

  return (
    <div className="users-page-container">
      <Navbar />
      <div className="users-page-content-container">
        <div className="top-list-container">
            <h1>רשימת משתמשים לפי חברות</h1>
        </div>
        {fakeUsers.map((companyData, index) => (
          <div className="companies-users" key={index}>
            <h2>{companyData.company}</h2>
            <UserList
              users={companyData.users}
              handleRemoveUser={handleRemoveUser}
              handleEditUser={handleEditUser}
              viewOnly={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
