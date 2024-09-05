import React from "react";
import { NavLink } from "react-router-dom";

const MenuAdmin = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <div>
            <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">
              Create Category
            </NavLink>
            <NavLink to="/dashboard/admin/add-products" className="list-group-item list-group-item-action">
              Create Product
            </NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
              Products
            </NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
              Orders
            </NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
