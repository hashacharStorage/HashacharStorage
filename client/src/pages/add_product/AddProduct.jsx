import React, { useState } from "react";
import "./addProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from "../../components/checkbox/Checkbox";
import RadioButtons from "../../components/radiobuttons/Radiobuttons";

const AddProduct = () => {
  const [checkedValues, setCheckedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleCheckboxChange = (values) => {
    setCheckedValues(values);
  };
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const options = [
    { label: "cellcom", value: "cellcom" },
    { label: "yes", value: "yes" },
    { label: "hot", value: "hot" },
    { label: "bezeq", value: "bezeq" },
    { label: "עברית", value: "bezeq" },
  ];

  const isBlack = [
    { label: "ציוד סיראלי", value: "option1" },
    { label: "ציוד שחור", value: "option2" },
  ];

  return (
    <div className="add-product-container">
      <Navbar />
      <div className="add-product-secondery-container">
        <div className="add-product-content-container">
          <h1>הוספת פריט חדש</h1>
          <div className="add-product-form">
            <input type="number" placeholder="כמות מינימאלית" min="1" />
            <input type="text" placeholder="שם הפריט" />
            <input type="text" placeholder="קוד הפריט" />
            <input
              className="add-product-desc"
              type="text"
              placeholder="תיאור הפריט"
            />
          </div>
          <Checkbox
            title={"חברה"}
            options={options}
            checkedValues={checkedValues}
            onChange={handleCheckboxChange}
          />
          <RadioButtons
            title=":סוג ציוד"
            options={isBlack}
            checkedValue={selectedValue}
            onChange={handleValueChange}
          />
              <div className="add-product-submit-button">הוספת פריט</div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
