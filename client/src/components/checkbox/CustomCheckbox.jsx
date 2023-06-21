import React from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi"; // Import icons from react-icons

const CustomCheckbox = ({ options, checkedValues, onChange }) => {
  const handleCheckboxChange = (value) => {
    const isChecked = checkedValues.includes(value);
    const updatedValues = isChecked
      ? checkedValues.filter((val) => val !== value)
      : [...checkedValues, value];
    onChange(updatedValues);
  };

  return (
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
          {checkedValues.includes(option.value) ? (
            <FiCheckSquare />
          ) : (
            <FiSquare />
          )}{" "}
          {/* Render custom icons */}
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CustomCheckbox;
