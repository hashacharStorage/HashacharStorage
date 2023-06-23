import React from "react";
import "./checkbox.css";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const Checkbox = ({ title, options, checkedCompanies, onChange }) => {

  const handleCheckboxChange = (value) => {
    const isChecked = checkedCompanies.includes(value);
    const updatedValues = isChecked
      ? checkedCompanies.filter((val) => val !== value)
      : [...checkedCompanies, value];
    onChange(updatedValues);
  };

  return (
    <div className="custom-checkbox-container">
      {title && <h3 className="checkbox-title">{title}</h3>}
      <div className="custom-checkbox">
        {options.map((option) => (
          <label key={option.id} className="custom-checkbox-label">
            <input
              type="checkbox"
              value={option.id}
              checked={checkedCompanies.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
              className="custom-checkbox-input"
            />
            <span className="custom-checkbox-icon">
              {checkedCompanies.includes(option.id) ? (
                <FiCheckSquare />
              ) : (
                <FiSquare />
              )}
            </span>
            {option.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
