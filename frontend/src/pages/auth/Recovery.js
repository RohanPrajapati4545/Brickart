import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Recovery = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    if (!storedEmail) {
      toast.error("Email not found. Please try again.")
      navigate("/forgot-password")
    } else {
      setEmail(storedEmail)
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Validation
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
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
        navigate('/reset-password')
        setOtp("")
      }, 3000)

    } catch (error) {
      toast.error("Unable to verify OTP")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card border-0 shadow rounded-4 px-4 py-5" style={{ width: "380px" }}>
        
        <h2 className="text-center mb-2 fw-semibold" style={{ color: "#356f5b" }}>
          Recovery
        </h2>

        <p className="text-center text-muted mb-1">
          Enter OTP to recover password
        </p>

        <p className="text-center text-muted mb-4">
          Enter 6 digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control py-2 rounded-3 text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill py-2 mt-3 text-white fw-semibold"
            style={{ backgroundColor: "#356f5b" }}
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  )
}

export default Recovery