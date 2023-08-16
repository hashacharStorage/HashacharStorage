import React, { useState } from "react";
import "./productAdmin.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";

const ProductAdmin = ({
  id,
  image,
  title,
  _id,
  serial,
  handleEditItem,
  handleRemoveItem,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleEdit = () => {
    handleEditItem(_id);
  };

  const handleRemove = () => {
    handleRemoveItem(_id);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
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
      <div className="product-details" onClick={handleModalToggle}>
        <span className="product-name"> {title} </span>
        <span className="serial"> | {serial} |</span>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={handleModalToggle}>
          <div className="modal-content">
            <img src={image || defaultImage} alt={title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
