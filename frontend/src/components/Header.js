import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {

  const { isAuth, logout, email } = useContext(AuthContext)
  const firstLetter = email?.charAt(0).toUpperCase();

  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg custom-navbar py-3">

      <div className="container">

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LOGO */}
        <NavLink className="navbar-brand logo d-flex align-items-center gap-2" to="/">
          <span className='ps-3'>Brickart</span>
        </NavLink>

        {/* MENU */}
        <div className={`navbar-collapse ${open ? "show" : "collapse"} justify-content-end`}>

          <ul className="navbar-nav ms-auto align-items-lg-center gap-3 flex-column flex-lg-row">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={()=>setOpen(false)}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={()=>setOpen(false)}>About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/work-gallery" onClick={()=>setOpen(false)}>Our Work</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>
            </li>

            {!isAuth ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={()=>setOpen(false)}>Login</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" onClick={()=>setOpen(false)}>Signup</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item position-relative profile-wrapper">

                {/* PROFILE ICON */}
                <div
                  className="profile-icon"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  {firstLetter}
                </div>

                {/* DROPDOWN */}
                <div className={`profile-dropdown ${profileOpen ? "show" : ""}`}>

                  <NavLink
                    to="/user/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false)
                      setOpen(false)
                    }}
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/user/my-booking"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false)
                      setOpen(false)
                    }}
                  >
                    My Booking
                  </NavLink>

                  <NavLink
                    className="dropdown-item"
                    to="/"
                    onClick={() => {
                      logout()
                      setProfileOpen(false)
                      setOpen(false)
                    }}
                  >
                    Logout
                  </NavLink>

                </div>

              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default Header