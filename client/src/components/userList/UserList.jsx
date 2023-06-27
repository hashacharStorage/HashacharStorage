import React, { useState } from "react";
import "./userList.css";
import User from "../user/User";

const UserList = ({ users,}) => {

//   const [currUser, setCurrUser] = useState({});


  const handleEditCurrUser = (userId, userCounter) => {
    // let copyCurrUser = { ...currUser, [userId]: userCounter };
    // setCurrUser(copyCurrUser);
  };

  const handleRemoveUser = (userId) => {
    // Implement your logic to remove the user here
    // console.log("Removing user with ID:", userId);
  };

  return (
    <div className="users-list">
      {users.map((user, index) => {
        return (
          <User
            firstName={user.firstName}
            lastName={user.lastName}
            _id={user._id}
            warehouse={user.warehouse}
            key={index}
            handleEditUser={handleEditCurrUser}
            handleRemoveUser={handleRemoveUser}
          />
        );
      })}
    </div>
  );
};

export default UserList;
