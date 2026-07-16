import React from 'react'
import AllBricks from './AllBricks'
import "./../App.css"
import { NavLink } from 'react-router-dom'

const WHY_US = [
  {
    icon: "🧱",
    title: "Kiln-Tested Quality",
    desc: "Every batch is checked for strength and finish before it leaves the yard — no cracked or under-fired bricks."
  },
  {
    icon: "🚚",
    title: "On-Time Site Delivery",
    desc: "Book today, get a confirmed delivery slot. We plan loads around your construction schedule, not ours."
  },
  {
    icon: "💰",
    title: "Straight Bulk Pricing",
    desc: "Transparent price per brick with real bulk-order discounts — no hidden loading or 'convenience' charges."
  },
  {
    icon: "📦",
    title: "Doorstep Unloading",
    desc: "Trucks come with unloading support, so your site labour isn't stuck waiting on a delivery."
  },
]

const STATS = [
  { value: "25,000+", label: "Bricks Delivered" },
  { value: "500+", label: "Sites Supplied" },
  { value: "48 hrs", label: "Avg. Delivery Time" },
  { value: "4.8★", label: "Customer Rating" },
]

const Home = () => {
  return (
    <div className='home-body'>

      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Build <span className="hero-highlight">Your Dreams</span> With Quality Bricks
          </h1>

          <p className="hero-subtitle">
            Trusted supplier for premium bricks — priced fair, delivered on time, straight to your site.
          </p>

          <NavLink to="/all-bricks">
            <button className="hero-btn mt-3 mb-3">
              Explore Bricks →
            </button>
          </NavLink>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="container">
        <div className="trust-strip">
          {STATS.map((s, i) => (
            <div className="trust-item" key={i}>
              <span className="trust-value">{s.value}</span>
              <span className="trust-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container why-section">
        <p className="section-eyebrow">Why builders choose us</p>
        <h2 className="section-heading">Built on quality, delivered on trust</h2>
        <p className="section-sub">
          From the kiln to your site — we handle the part that usually slows a project down.
        </p>

        <div className="row g-4 mt-2">
          {WHY_US.map((item, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={i}>
              <div className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL BRICKS */}
      <section className="container mt-4" id="catalogue">
        <p className="section-eyebrow">Our catalogue</p>
        <h2 className="section-heading">Pick your brick, we'll handle the rest</h2>
        <AllBricks hideHeading />
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h3>Got a delivery deadline?</h3>
            <p>Tell us your quantity and site location — we'll lock in a slot.</p>
          </div>
          <NavLink to="/contact">
            <button className="hero-btn">Get a Quote →</button>
          </NavLink>
        </div>
      </section>

    </div>
  )
}

export default Home