import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AdminSideBar = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="sidebar d-flex flex-column p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      
      <h4 className="text-center mb-4">Admin Panel</h4>

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item mb-2">
          <NavLink to="/admin/all-users" className="nav-link text-white">
            All Users
          </NavLink>
        </li>


         <li className="   mb-2">
          <NavLink to="/admin/booking-request" className="nav-link text-white">
            Booking Requests
          </NavLink>
        </li>

        <li className="mb-2">
          <details>
            <summary className="nav-link text-white" style={{ cursor: "pointer" }}>
              Manage Bricks
            </summary>

            <ul className="nav flex-column ms-3 mt-2">
              <li className="nav-item mb-1">
                <NavLink to="/admin/add-bricks" className="nav-link text-white">
                  Add Bricks
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/admin/manage-bricks" className="nav-link text-white">
                  Manage Bricks
                </NavLink>
              </li>
            </ul>
          </details>
        </li>

        <li className="mt-3">
          <NavLink to="/login" className="nav-link text-danger" onClick={logout}>
            Logout
          </NavLink>
        </li>

      </ul>
    </div>
  )
}

export default AdminSideBar