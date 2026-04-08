import React from 'react'
import "./../App.css"

import img1 from "./../images/img1.jpg"
import img2 from "./../images/img2.jpeg"
const OurWork = () => {

  return (
    <div className="container py-5">

      {/* TITLE */}
      <div className="text-center mb-5">
        <h2 className="work-title">Our Work Gallery</h2>
        <p className="text-muted">
          Real construction work done by our team
        </p>
      </div>

      {/* GRID */}
      <div className="row g-4">

        {/* IMAGE 1 */}
        <div className="col-md-4 col-sm-6 col-12">
          <div className="card work-card">
            <img 
              src={img1}
              className="card-img-top work-img" 
              alt=""
            />
          </div>
        </div>

        {/* VIDEO 1 */}
        <div className="col-md-4 col-sm-6 col-12">
          <div className="card work-card video-wrapper">
           <img 
              src={img1}
              className="card-img-top work-img" 
              alt=""
            />
          </div>
        </div>

        {/*IMAGE 2 */}
        <div className="col-md-4 col-sm-6 col-12">
          <div className="card work-card">
            <img 
             src={img2}
              className="card-img-top work-img" 
              alt=""
            />
          </div>
        </div>

        {/*VIDEO 2 */}
        <div className="col-md-4 col-sm-6 col-12">
          <div className="card work-card video-wrapper">
           <img 
              src={img1}
              className="card-img-top work-img" 
              alt=""
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default OurWork