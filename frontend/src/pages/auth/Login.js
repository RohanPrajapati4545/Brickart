import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import "./../../App.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const loginUser = async (e) => {
    e.preventDefault()

    try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.msg)
        return
      }

      toast.success(data.msg)

      login(data.token, data.role, data.user.email)

      setEmail("")
      setPassword("")

      if (data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <div className="card shadow-lg p-4 login-card">

        <h3 className="text-center mb-4 login-title">Login</h3>

        <form onSubmit={loginUser}>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type='email'
              className="form-control"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type='password'
              className="form-control"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <NavLink style={{fontSize:"small", textDecoration:"none", color:"black"}} to='/forgot-password'>Forgot Password</NavLink> 
          </div>
          

          {/* BUTTON */}
          <button type='submit' className="btn w-100 login-btn">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login