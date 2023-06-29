import React, { useState } from "react";
import "./adminList.css";
import User from "../user/User";
import ProductAdmin from "../product_admin/ProductAdmin";

const AdminList = ({ items, handleRemoveUser, handleEditUser, type }) => {
  //   const [currUser, setCurrUser] = useState({});

  return (
    <div className="items-list">
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
              handleEditUser={handleEditUser}
              handleRemoveUser={handleRemoveUser}
            />
          );
        })}
      {type === "products" &&
        items.map((product, index) => {
          console.log(product)
          return (
            <ProductAdmin
              id={product.product_id}
              title={product.title}
              _id={product._id}
              serial={product.serial}
              key={index}
              handleEditUser={handleEditUser}
              handleRemoveUser={handleRemoveUser}
            />
          );
        })}
    </div>
  );
};

export default AdminList;
