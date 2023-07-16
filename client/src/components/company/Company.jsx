import React from "react";
import "./company.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";

const Company = ({
  index,
  id,
  name,
  _id,
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
    <div className="company-container">
      <div className="company-actions">
        <BsFillWrenchAdjustableCircleFill
          className="edit-icon"
          onClick={handleEdit}
        />
        <BsFillXCircleFill className="remove-icon" onClick={handleRemove} />
      </div>
      <div className="company-details">
          <span className="company-name"> {name} </span>
          <span className="id"> | {id+1} |</span>
        </div>
    </div>
  );
};

export default Company;
