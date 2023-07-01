import React, { useState } from "react";
import "./adminList.css";
import User from "../user/User";
import ProductAdmin from "../product_admin/ProductAdmin";
import Company from "../company/Company";
const AdminList = ({
  title,
  items,
  handleRemoveItem,
  handleEditItem,
  type,
}) => {
  return (
    <div className="admin-list-container">
      <h2>{title}</h2>
      <div className="admin-list">
        {type === "users" &&
          items.map((user, index) => {
            return (
              <User
                firstName={user.firstName}
                lastName={user.lastName}
                _id={user._id}
                id={user.id}
                warehouse={user.warehouse}
                key={index}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
        {type === "products" &&
          items.map((product, index) => {
            return (
              <ProductAdmin
                id={product.product_id}
                title={product.title}
                _id={product._id}
                serial={product.serial}
                key={index}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
        {type === "companies" &&
          items.map((company, index) => {
            return (
              <Company
                id={index}
                name={company.name}
                _id={company._id}
                key={index}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AdminList;
