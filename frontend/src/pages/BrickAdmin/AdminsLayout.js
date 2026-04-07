import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar'

const AdminsLayout = () => {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <AdminSideBar />

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>

    </div>
  )
}

export default AdminsLayout