import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Email = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please Enter Your Email")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.msg)
        return
      }

      toast.success(data.msg)
      localStorage.setItem("email", email)

      setTimeout(() => {
        navigate('/recovery')
        setEmail("")
      }, 3000)

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card border-0 shadow-lg rounded-4 p-4" style={{ width: "400px" }}>
        
        <div className="card-body">
          <h2 className="text-center fw-semibold mb-4 text-success">
            Password Recovery
          </h2>

          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label fw-medium">Email</label>
              <input
                type="email"
                className="form-control rounded-3 py-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 rounded-pill py-2 fw-semibold text-white"
              style={{ backgroundColor: "#356f5b" }}
            >
              Continue
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Email