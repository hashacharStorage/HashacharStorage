import React from "react";
import "./checkbox.css";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const Checkbox = ({ title, options, checkedValues, onChange }) => {
  const handleCheckboxChange = (value) => {
    const isChecked = checkedValues.includes(value);
    const updatedValues = isChecked
      ? checkedValues.filter((val) => val !== value)
      : [...checkedValues, value];
    onChange(updatedValues);
  };

  return (
    <div className="custom-checkbox-container">
      {title && <h3 className="checkbox-title">{title}</h3>}
      <div className="custom-checkbox">
        {options.map((option) => (
          <label key={option.value} className="custom-checkbox-label">
            <input
              type="checkbox"
              value={option.value}
              checked={checkedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="custom-checkbox-input"
            />
            <span className="custom-checkbox-icon">
              {checkedValues.includes(option.value) ? (
                <FiCheckSquare />
              ) : (
                <FiSquare />
              )}
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
