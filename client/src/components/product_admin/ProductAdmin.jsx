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
  handleEditItem,
  handleRemoveItem,
}) => {
  const handleEdit = () => {
    handleEditItem(_id);
  };

  const handleRemove = () => {
    handleRemoveItem(_id);
  };

  return (
    <div className="product-container">
      <div className="product-actions">
        <BsFillWrenchAdjustableCircleFill
          className="edit-icon"
          onClick={handleEdit}
        />
        <BsFillXCircleFill className="remove-icon" onClick={handleRemove} />
      </div>
      <div className="product-details">
          <span className="product-name"> {title} </span>
          <span className="serial"> | {serial} |</span>
        </div>
    </div>
  );
};

export default ProductAdmin;
