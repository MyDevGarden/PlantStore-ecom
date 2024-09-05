import React from 'react'
import { NavLink } from 'react-router-dom'
const MenuUser = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <div>
            <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
              profile
            </NavLink>
            <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
              orders
            </NavLink>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuUser