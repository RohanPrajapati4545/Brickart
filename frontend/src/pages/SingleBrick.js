import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const SingleBrick = () => {
    const { token } = useContext(AuthContext)
    const { id } = useParams()
    const [brick, setBrick] = useState(null)
const navigate=useNavigate()
    const getSingleBrick = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/single-brick/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()

            if (!res.ok) return

            setBrick(data.brick)
            console.log("ID:", id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    if (token && id) {
        getSingleBrick()
    }
}, [token, id])

  if (!brick) {
  return <h3 className="text-center mt-5">Loading...</h3>
}

    return (
        <div className="container mt-5" style={{ width: "70%" }}>

            <div className="card shadow p-4">

                {/* 🔥 ROW 1 → TEXT + IMAGE */}
                <div className="row align-items-center">

                    {/* LEFT → TEXT */}
                    <div className="col-md-6">

                        <h2 className="mb-3">{brick.brickName}</h2>

                        <p className="text-muted">{brick.description}</p>

                        <hr />

                        <p><b>Price:</b> ₹{brick.pricePerBrick} / per brick</p>
                        <p><b>Category:</b> {brick.category}</p>
                        <p><b>Stock:</b> {brick.stock}</p>
                        <p><b>Size:</b> {brick.size}</p>
    

                         <button 
              className=" premium-btn w-100 mt-4"
              onClick={()=>navigate(`/brick-book/${brick._id}`)}
            >
                            Order Now
                        </button>

                    </div>

                    {/* RIGHT → IMAGE */}
                    <div className="col-md-6">

                        <img
                            src={`http://localhost:5000/uploads/${brick.image}`}
                            className="img-fluid rounded"
                            style={{ height: "300px", objectFit: "cover", width: "100%" }}
                            alt=""
                        />

                    </div>

                </div>

                {/* 🔥 ROW 2 → VIDEO FULL WIDTH */}
                {
                    brick.video && (
                        <div className="row mt-4">
                            <div className="col-12">

                                <video
                                    width="100%"
                                    height="350"
                                    controls
                                    className="rounded shadow"
                                >
                                    <source
                                        src={`http://localhost:5000/uploads/${brick.video}`}
                                        type="video/mp4"
                                    />
                                </video>

                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default SingleBrick