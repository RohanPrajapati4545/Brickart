import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">

        <div className="row">

          <div className="col-md-4 mb-3">
            <h4>Brickart</h4>
            <p>
              Premium quality bricks with trusted service.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>

            <ul className="list-unstyled">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>

            <p>📞 +91 7415377427</p>
            <p>✉️ rohanprajjapati@gmail.com</p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          <p className="mb-0">
            © 2026 Brickart. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer