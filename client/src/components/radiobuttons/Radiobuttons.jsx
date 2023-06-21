import React from "react";
import "./radiobuttons.css";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";

const RadioButtons = ({ title, options, checkedValue, onChange }) => {
  const handleRadioChange = (value) => {
    onChange(value);
  };

  return (
    <div className="custom-radio-container">
      {title && <h3 className="radio-title">{title}</h3>}
      <div className="custom-radio">
        {options.map((option) => (
          <label key={option.value} className="custom-radio-label">
            <input
              type="radio"
              value={option.value}
              checked={checkedValue === option.value}
              onChange={() => handleRadioChange(option.value)}
              className="custom-radio-input"
            />
            <span className="custom-radio-icon">
              {checkedValue === option.value ? (
                <ImRadioChecked />
              ) : (
                <ImRadioUnchecked />
              )}
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtons;
