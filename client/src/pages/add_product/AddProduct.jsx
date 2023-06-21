import React, { useState } from "react";
import "./addProduct.css";
import Navbar from "../../components/navbar/Navbar";
// import CustomCheckbox from "../../components/checkbox/CustomCheckBox";

const AddProduct = () => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleCheckboxChange = (event) => {
    const optionValue = event.target.value;

    if (event.target.checked) {
      setSelectedOption((prevSelectedOptions) => [
        ...prevSelectedOptions,
        optionValue,
      ]);
    } else {
      setSelectedOption((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== optionValue)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Options:", selectedOption);
    // Perform any additional actions with the selected options
  };

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

          {/* <div className="checkboxes-container">
            <div className="checkbox-container">
              <div className="checkbox-title">חברה</div>
              <input
                type="checkbox"
                id="option1-checkbox"
                name="company"
                value="option1"
                onChange={handleCheckboxChange}
              />
              cellcom
              <input
                type="checkbox"
                id="option2-checkbox"
                name="company"
                value="option2"
                onChange={handleCheckboxChange}
              />
              yes
              <input
                type="checkbox"
                id="option3-checkbox"
                name="company"
                value="option3"
                onChange={handleCheckboxChange}
              />
              hot
            </div>

            <div className="checkbox-container">
              <div className="checkbox-title">חברה</div>
              <input
                type="checkbox"
                id="option1-checkbox"
                name="company"
                value="option1"
                onChange={handleCheckboxChange}
              />
              cellcom
              <input
                type="checkbox"
                id="option2-checkbox"
                name="company"
                value="option2"
                onChange={handleCheckboxChange}
              />
              yes
              <input
                type="checkbox"
                id="option3-checkbox"
                name="company"
                value="option3"
                onChange={handleCheckboxChange}
              />
              hot
            </div>
            <div className="checkbox-container">
              <div className="checkbox-title">חברה</div>
              <input
                type="checkbox"
                id="option1-checkbox"
                name="company"
                value="option1"
                onChange={handleCheckboxChange}
              />
              cellcom
              <input
                type="checkbox"
                id="option2-checkbox"
                name="company"
                value="option2"
                onChange={handleCheckboxChange}
              />
              yes
              <input
                type="checkbox"
                id="option3-checkbox"
                name="company"
                value="option3"
                onChange={handleCheckboxChange}
              />
              hot
            </div>
          </div> */}
          {/* <div className="add-product-submit-button">הוספת פריט</div> */}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
