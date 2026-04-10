import React from 'react'
import AllBricks from './AllBricks'
import "./../App.css"
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='home-body'>
      
  <section className="hero">
  <div className="hero-container">
    <h1 className="hero-title">
      Build <span style={{color:"#19a14b"}}>Your Dreams</span> With Quality Bricks
    </h1>

    <p className="hero-subtitle">
      Trusted supplier for premium bricks at best price
    </p>

    <NavLink to="/all-bricks">
      <button className="hero-btn">
        Explore Bricks →
      </button>
    </NavLink>
  </div>
</section>

  

      {/* 🔥 ALL BRICKS */}
      <section className="container">
       

        <AllBricks />
      </section>
    </div>

    </>
  )
}

export default Home