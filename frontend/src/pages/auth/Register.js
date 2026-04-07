import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

  const [name, SetName] = useState("")
  const [email, SetEmail] = useState("")
  const [contact, SetContact] = useState("")
  const [password, SetPassword] = useState("")
  const [confirm_password, SetConfirmPassword] = useState("")
  const navigate = useNavigate()

  const sendData = async (e) => {
    e.preventDefault()

    if (!name || !email || !contact || !password || !confirm_password) {
      toast.error("All fields are required")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    if (password !== confirm_password) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          contact,
          password,
          confirm_password
        }),
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

      SetName('')
      SetEmail('')
      SetContact('')
      SetPassword('')
      SetConfirmPassword('')

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card border-0 shadow rounded-4 px-4 py-5" style={{ width: "380px" }}>
        
        <h2 className="text-center mb-4 fw-semibold" style={{ color: "#356f5b" }}>
          Register
        </h2>

        <form onSubmit={sendData}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control py-2 rounded-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control py-2 rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control py-2 rounded-3"
              placeholder="Enter your contact"
              value={contact}
              onChange={(e) => SetContact(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control py-2 rounded-3"
              placeholder="Enter password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control py-2 rounded-3"
              placeholder="Confirm password"
              value={confirm_password}
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill py-2 mt-3 text-white fw-semibold"
            style={{ backgroundColor: "#356f5b" }}
          >
            Register
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register