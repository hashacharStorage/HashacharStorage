import React, { useEffect, useState } from "react";
import "./product.css";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const Product = ({
  title,
  serial,
  desc,
  companies,
  minQuantity,
  black,
  product_id,
  handleEditCurrOrder,
}) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const savedProductCounter = localStorage.getItem(`product-${product_id}`);
    if (savedProductCounter) {
      setCounter(Number(savedProductCounter));
    } else setCounter(0);
  });

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

  return (
    <div className="product-container">
      <div className="product-counter-container">
        <FiPlusCircle
          onClick={() => {
            handleCounter(1);
          }}
          className="plus-button"
        />
        <span className="counter">{counter}</span>
        <FiMinusCircle
          onClick={() => {
            handleCounter(-1);
          }}
          className="minus-button"
        />
      </div>
      <span className="product-title">{title}</span>
    </div>
  );
};

export default Product;
