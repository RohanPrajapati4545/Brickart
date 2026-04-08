import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import "./../App.css"

const SingleBrick = () => {
    const { token } = useContext(AuthContext)
    const { id } = useParams()
    const [brick, setBrick] = useState(null)
    const navigate = useNavigate()

    const getSingleBrick = async () => {
        try {
            const res = await fetch(`https://brickart.onrender.com/api/admin/single-brick/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            if (!res.ok) return
            setBrick(data.brick)
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
        <div className="brick-page">

            <div className="brick-card">

                <div className="row align-items-center">

                    {/* LEFT */}
                    <div className="col-md-6">

                        <h2 className="brick-title">{brick.brickName}</h2>

                        <p className="brick-desc">{brick.description}</p>

                        <div className="brick-details">
                            <p><span>Price:</span> ₹{brick.pricePerBrick}</p>
                            <p><span>Category:</span> {brick.category}</p>
                            <p><span>Stock:</span> {brick.stock}</p>
                            <p><span>Size:</span> {brick.size}</p>
                        </div>

                        <button
                            className="order-btn"
                            onClick={() => navigate(`/brick-book/${brick._id}`)}
                        >
                            Order Now
                        </button>

                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="col-md-6 text-center">

                        <img
                            src={`https://brickart.onrender.com/uploads/${brick.image}`}
                            className="brick-img"
                            alt=""
                        />

                    </div>

                </div>

                {/* VIDEO */}
                {
                    brick.video && (
                        <div className="video-section">
                            <video controls>
                                <source
                                    src={`https://brickart.onrender.com/uploads/${brick.video}`}
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default SingleBrick