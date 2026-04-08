import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-section">

      <div className="container">

        <div className="row g-4">

          {/* BRAND */}
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-logo">Brickart</h4>
            <p>
              Providing premium quality bricks with trusted service and affordable pricing.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>Home</li>
              <li>About</li>
              <li>Our Work</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="col-lg-3 col-md-6">
            <h5>Services</h5>
            <ul className="footer-links">
              <li>Brick Supply</li>
              <li>Construction Support</li>
              <li>Bulk Orders</li>
              <li>Fast Delivery</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-3 col-md-6">
            <h5>Contact</h5>
            <p>📍 India</p>
            <p>📞 +91 7415377427</p>
            <p>✉️ rohanprajjapati@gmail.com</p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom text-center mt-4">
          <p>© 2026 Brickart. All rights reserved.</p>
        </div>

      </div>

    </footer>
  )
}

export default Footer