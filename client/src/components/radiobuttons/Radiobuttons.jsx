import React from "react";
import "./radiobuttons.css";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";

const RadioButtons = ({ title, options, checkedisBlack, onChange,chosenOption }) => {
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
              checked={checkedisBlack === option.isBlack}
              onChange={() => handleRadioChange(option.value)}
              className="custom-radio-input"
            />
            <span className="custom-radio-icon">
              {checkedisBlack === option.value ? (
                <ImRadioChecked  />
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
