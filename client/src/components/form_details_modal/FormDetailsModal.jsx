// FormDetailsModal.js
import React, { useState, useRef, useEffect } from "react";
import "./formDetailsModal.css";
import SubmitButton from "../submit_button/SubmitButton";
import { useForm } from "react-hook-form";

const FormDetailsModal = ({ companies, isOpen, onClose, onSave }) => {
  const { register, handleSubmit } = useForm();
  const modalRef = useRef();

  const handleCloseOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.querySelector(".whiteboard-container").contains(e.target)) {
      onClose();
    }
  };
  
  const onSubmit = (data) => {
    onSave(data)
  };
  const handleFormSubmit = handleSubmit(onSubmit);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleCloseOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleCloseOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (

    <div ref={modalRef} className="modal-container" >
      <div className="whiteboard-container">
        <h1>יצירת טופס חדש</h1>
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="שם הטופס"
            {...register("fileName", {
              required: true,
            })}
          />
          <select {...register("company")}>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          {/* <input
            type="text"
            placeholder="שם פרטי"
            {...register("firstName", {
              required: true,
            })}
          />

          <input
            type="text"
            placeholder="שם משפחה"
            {...register("lastName", {
              required: true,
            })}
          />

          <input
            type="number"
            placeholder="מספר מחסן"
            min="0"
            pattern="/^\d+$/"
            {...register("warehouse", {
              required: true,
            })}
          />

          <input
            type="text"
            placeholder="מידת חולצה"
            {...register("shirt", {
              required: true,
            })}
          /> */}

          <SubmitButton
            title={"יצירת טופס"}
            oncllickhandle={handleFormSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default FormDetailsModal;
