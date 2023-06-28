import React, { useState } from "react";
import "./userList.css";
import User from "../user/User";

const UserList = ({ users,handleRemoveUser,handleEditUser}) => {

//   const [currUser, setCurrUser] = useState({});

  return (
    <div className="users-list">
      {users.map((user, index) => {
        return (
          <User
            firstName={user.firstName}
            lastName={user.lastName}
            _id={user._id}
            id={user.id}
            warehouse={user.warehouse}
            key={index}
            handleEditUser={handleEditUser}
            handleRemoveUser={handleRemoveUser}
          />
        );
      })}
    </div>
  );
};

export default UserList;
