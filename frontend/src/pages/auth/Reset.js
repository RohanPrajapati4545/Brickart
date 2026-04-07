import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Reset = () => {

  const email = localStorage.getItem("email")
  const [new_password, set_new_password] = useState("")
  const [confirm_password, set_confirm_password] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation first
    if (!new_password || !confirm_password) {
      toast.error("All Fields Are Required")
      return
    }

    if (new_password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    if (new_password !== confirm_password) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, new_password, confirm_password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.msg)
        return
      }

      toast.success(data.msg)

      setTimeout(() => {
        navigate("/login")
      }, 3000)

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card border-0 shadow rounded-4 px-4 py-5" style={{ width: "380px" }}>
        
        <h2 className="text-center mb-4 fw-semibold" style={{ color: "#356f5b" }}>
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control py-2 rounded-3"
              placeholder="Enter new password"
              value={new_password}
              onChange={(e) => set_new_password(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control py-2 rounded-3"
              placeholder="Confirm password"
              value={confirm_password}
              onChange={(e) => set_confirm_password(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill py-2 mt-3 text-white fw-semibold"
            style={{ backgroundColor: "#356f5b" }}
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  )
}

export default Reset