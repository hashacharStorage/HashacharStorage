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
          <span className="user-name"> {name} </span>
          <span className="warehouse"> | {id+1} |</span>
        </div>
      </div>
    </div>
  );
};

export default Company;
