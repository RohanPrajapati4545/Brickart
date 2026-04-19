import React, { useContext, useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AllBricks = () => {
    const { isAuth } = useContext(AuthContext)
    const [bricks, setBricks] = useState([])
    const navigate = useNavigate()
    const getAllBricks = async () => {
        try {
            const res = await fetch("https://brickart.onrender.com/api/admin/get-all-bricks", {
                method: "GET",

            })

            const data = await res.json()

            if (!res.ok) return

            setBricks(data.data)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getAllBricks()
    }, [])

    return (
       <div className="container mt-2">

  <div className="row g-4">

    {
      bricks.map((item) => (
        <div className="col-lg-4 col-md-6 col-12" key={item._id}>

          <div className="brick-card-new ">

            <div className="brick-img-wrapper">
              <img
                src={`https://brickart.onrender.com/uploads/${item.image}`}
                alt=""
              />
              <span className="brick-badge">{item.brickName}</span>
            </div>

            <div className="brick-content">

              <h5>{item.category}</h5>

              <p className="price">₹{item.pricePerBrick} / brick</p>

              <div className="brick-info">
                <span>📏 {item.size}</span>
              </div>

              <button
                className="order-btn " 
                onClick={() => isAuth
                  ? navigate(`/single-brick/${item._id}`)
                  : toast.error("Please login first")
                }
              >
                View Details
              </button>

            </div>

          </div>

        </div>
      ))
    }

  </div>

</div>
    )
}

export default AllBricks