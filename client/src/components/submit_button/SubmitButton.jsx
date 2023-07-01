import React from "react";
import "./submitButton.css"
const SubmitButton = ({ oncllickhandle, title }) => {
  return (
    <div
      className="submit-button"
      type="submit"
      onClick={() => oncllickhandle()}
    >
      <span>{title}</span>
    </div>
  );
};

export default SubmitButton;
