import React from "react";
import "./productAdmin.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";

const ProductAdmin = ({
  id,
  title,
  _id,
  serial,
  handleEditUser,
  handleRemoveUser,
}) => {
  const handleEdit = () => {
    handleEditUser(_id);
  };

  const handleRemove = () => {
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
           {title}{" "}
          </span>
          <span className="warehouse"> | {serial} |</span>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
