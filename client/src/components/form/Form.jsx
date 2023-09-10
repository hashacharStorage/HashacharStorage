import React, { useState } from "react";
import "./form.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";

const Form = ({ id, title, _id, handleEditItem, handleRemoveItem,handleSelectItem }) => {

  const handleEdit = () => {
    handleEditItem(_id);
  };

  const handleRemove = () => {
    handleRemoveItem(_id);
  };

  return (
    <div className="form-container">
      <div className="form-actions">
        <BsFillWrenchAdjustableCircleFill
          className="edit-icon"
          onClick={handleEdit}
        />
        <BsFillXCircleFill className="remove-icon" onClick={handleRemove} />
      </div>
      <div className="form-details">
        <span className="form-name" onClick={()=>handleSelectItem(_id,title)}>
          {" "}
          {title}{" "}
        </span>
        <span className="serial"> | {id + 1} |</span>
      </div>
    </div>
  );
};

export default Form;
