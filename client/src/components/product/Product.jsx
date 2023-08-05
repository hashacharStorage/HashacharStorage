import React, { useEffect, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import defaultImage from "../../images/logo.png";
import "./product.css";

const Product = ({
  title,
  serial,
  desc,
  companies,
  minQuantity,
  black,
  product_id,
  image,
  handleEditCurrOrder,
  viewOnly = false,
  quantity,
}) => {
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (quantity === -1) {
      const savedProductCounter = localStorage.getItem(`product-${product_id}`);
      if (savedProductCounter) {
        setCounter(Number(savedProductCounter));
      } else setCounter(0);
    } else {
      setCounter(quantity);
    }
  }, [quantity, product_id]);

  const handleCounter = (multiplier) => {
    if (!(counter === 0 && multiplier === -1)) {
      const newCounter = minQuantity * multiplier + counter;
      setCounter(newCounter);
      handleEditCurrOrder(product_id, newCounter);
      if (newCounter === 0) {
        localStorage.removeItem(`product-${product_id}`);
      } else {
        localStorage.setItem(`product-${product_id}`, newCounter);
      }
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="product-container">
      <div className="product-counter-container">
        {!viewOnly && (
          <FiPlusCircle
            onClick={() => {
              handleCounter(1);
            }}
            className="plus-button"
          />
        )}
        <span className="counter">{counter}</span>
        {!viewOnly && (
          <FiMinusCircle
            onClick={() => {
              handleCounter(-1);
            }}
            className="minus-button"
          />
        )}
      </div>
      <span className="product-title" onClick={handleModalToggle}>
        {title}
      </span>
      {showModal && (
        <div className="modal-overlay" onClick={handleModalToggle}>
          <div className="modal-content">
            <img src={image || defaultImage} alt={title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
