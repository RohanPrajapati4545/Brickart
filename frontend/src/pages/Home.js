import React from 'react'
import AllBricks from './AllBricks'
import "./../App.css"
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
    
      {/* HERO SECTION */}
      <section className="home-hero d-flex align-items-center">
        <div className="container text-center">
          <h1 className="home-title">
            Build Your Dreams With Quality Bricks 
          </h1>
          <p className="home-subtitle">
            Trusted supplier for premium bricks at best price
          </p>

         <NavLink to="/all-bricks"> <button className="btn home-btn mt-3" >
            Explore Bricks
          </button></NavLink>
        </div>
      </section>

  

      {/* 🔥 ALL BRICKS */}
      <section className="container">
        <h3 className="text-center mb-4 home-section-title">
          Available Bricks
        </h3>

        <AllBricks />
      </section>

    </>
  )
}

export default Home