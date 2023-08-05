import React, { useState } from "react";
import "./productsList.css";
import Product from "../product/Product";

const ProductsList = ({ products, viewOnly = false }) => {
  const [currOrder, setCurrOrder] = useState({});
  const handleEditCurrOrder = (productId, productCounter) => {
    let copyCurrOrder = { ...currOrder, [productId]: productCounter };
    setCurrOrder(copyCurrOrder);
  };

  return (
      <div className="products-list">
        {products.map((product, index) => {
          return (
            <Product
              title={product.title}
              serial={product.serial}
              desc={product.desc}
              companies={product.companies}
              minQuantity={product.minQuantity}
              image={product.image===undefined?null:product.image}
              black={product.black}
              key={index}
              product_id={product.product_id}
              handleEditCurrOrder={handleEditCurrOrder}
              viewOnly={viewOnly}
              quantity={viewOnly?product.quantity:-1}
            />
          );
        })}
      </div>
  );
};

export default ProductsList;
