import React, { useState } from "react";
import "./adminList.css";
import User from "../user/User";
import ProductAdmin from "../product_admin/ProductAdmin";
import Company from "../company/Company";
import Form from "../form/Form";

const USERS = "users";
const PRODUCTS = "products";
const COMPANIES = "companies";
const FORMS = "forms";
const AdminList = ({
  title,
  items,
  handleRemoveItem,
  handleEditItem,
  type,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="admin-list">
        {type === USERS &&
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
        {type === PRODUCTS &&
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
                image={product.image === undefined ? null : product.image}
              />
            );
          })}
        {type === COMPANIES &&
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
        {type === FORMS &&
          items.map((form, index) => {
            console.log(form)
            return (
              <Form
                id={index}
                title={form.formName}
                _id={form._id}
                key={index}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            );
          })}
      </div>
    </>
  );
};

export default AdminList;
