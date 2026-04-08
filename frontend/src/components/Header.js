import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Header = () => {


  const { isAuth, logout, email } = useContext(AuthContext)
  const firstLetter = email?.charAt(0).toUpperCase();
  const [open, setOpen] = useState(false)




  return (
    <nav className="navbar navbar-expand-lg custom-navbar py-3">

      <div className="container">

        {/* LOGO */}
        <NavLink className="navbar-brand logo d-flex align-items-center gap-2" to="/">
         
          <span className='ps-3'>Brickart</span>
        </NavLink>

        {/* MENU */}
        <div className="navbar-collapse d-flex justify-content-end">

          <ul className="navbar-nav ms-auto align-items-center gap-4">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/work-gallery">Our Work</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>

            {/* LOGIN SIGNUP BUTTON */}
            {!isAuth ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (<>
              <li className="nav-item position-relative profile-wrapper">

                {/* ICON */}
                <div
                  className="profile-icon"
                  onClick={() => setOpen(!open)}
                >
                  {firstLetter}
                </div>

                {/* DROPDOWN */}
                <div className={`profile-dropdown ${open ? "show" : ""}`}>

                  <NavLink to="/user/profile" className="dropdown-item ">
                 <i className="fa-solid fa-user me-2"></i>Profile
                  </NavLink>

                  <NavLink to="/user/my-booking" className="dropdown-item">
                <i className="fa-solid fa-calendar-check me-2"></i>My Booking
                  </NavLink>

                  <NavLink className="dropdown-item" to="/" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket me-2"></i>  Logout
                </NavLink>


                </div>

              </li>
            </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  )
}

export default Header