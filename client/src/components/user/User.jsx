import React from "react";
import "./user.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";

const User = ({
  firstName,
  id,
  lastName,
  _id,
  warehouse,
  handleEditUser,
  handleRemoveUser,
}) => {
  const handleEdit = () => {
    handleEditUser(_id);
  };

  const handleRemove = () => {
    // Handle remove functionality
    handleRemoveUser(id);
  };

  return (
    <div className="user-container">
      <div className="user-actions">
        <BsFillWrenchAdjustableCircleFill
          className="edit-icon"
          onClick={handleEdit}
        />
        <BsFillXCircleFill className="remove-icon" onClick={handleRemove} />
      </div>
      <div className="user-details">
        <div className="user-name-warehouse">
          <span className="user-name">
            {" "}
            {firstName} {lastName}{" "}
          </span>
          <span className="warehouse"> | {warehouse} |</span>
        </div>
      </div>
    </div>
  );
};

export default User;
