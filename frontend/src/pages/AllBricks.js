import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AllBricks = () => {
    const { isAuth } = useContext(AuthContext)
    const [bricks, setBricks] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const getAllBricks = async () => {
        try {
            const res = await fetch("https://brickart.onrender.com/api/admin/get-all-bricks", {
                method: "GET",

            })

            const data = await res.json()

            if (!res.ok) return

            setBricks(data.data)
           
setLoading(false)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getAllBricks()
    }, [])

    return (
     <div className="container mt-2">

  {!loading && bricks.length > 0 && (
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={20}
    slidesPerView={1}
    loop={true}
    speed={1000}

    observer={true}
    observeParents={true}

    autoplay={{
      delay: 2000,
      disableOnInteraction: false
    }}

    pagination={{ clickable: true }}

    breakpoints={{
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }}
  >

    {
      bricks.map((item) => (
        <SwiperSlide key={item._id }>

          <div className="brick-card-new">

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
                className="order-btn"
                onClick={() => isAuth
                  ? navigate(`/single-brick/${item._id}`)
                  : toast.error("Please login first")
                }
              >
                View Details
              </button>

            </div>

          </div>

        </SwiperSlide>
      ))
    }

  </Swiper>
)}
</div>
    )
}

export default AllBricks