import React, { useState } from "react";
import "./form.css";
import {
  BsFillXCircleFill,
  BsFillWrenchAdjustableCircleFill,
} from "react-icons/bs";
import axios from "axios";
import { clientConfig } from "../../utils/clientConfig";
import Cookies from "js-cookie";

const Form = ({ id, title, _id, handleEditItem, handleRemoveItem }) => {
  const downloadPdf = async () => {
    try {
      const token = "Bearer " + Cookies.get("token");
      console.log(`${clientConfig.API_PATH}find/${_id}`)
      const response = await axios.get(`${clientConfig.API_PATH}form/find/${_id}`, {
        params: {
          _id: _id,
        },
        headers: {
          token: token,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
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
        <span className="form-name" onClick={downloadPdf}>
          {" "}
          {title}{" "}
        </span>
        <span className="serial"> | {id + 1} |</span>
      </div>
    </div>
  );
};

export default Form;
