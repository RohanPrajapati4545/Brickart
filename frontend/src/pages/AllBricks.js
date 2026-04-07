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
        <div className="container mt-4">
         

            <div className="row">
                {
                    bricks.map((item) => (
                        <div className="col-md-4 mb-4" key={item._id}>
                            <div className="card shadow">

                                <img src={`http://localhost:5000/uploads/${item.image}`}
                                    className="card-img-top"
                                    height="200"
                                    style={{ objectFit: "cover" }} alt=''/>

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {item.brickName}
                                    </h5>

                                    {/* <p className="card-text">
                                        {item.description}
                                    </p> */}

                                    <p><b>Price:</b> ₹{item.pricePerBrick}/per brick</p>
                                    <p><b>Category:</b> {item.category}</p>
                                    {/* <p><b>Stock:</b> {item.stock}</p> */}
                                    <p><b>Size:</b> {item.size}</p>

                                    {/* <video width="100%" height="150" controls>
                                        <source
                                            src={`http://localhost:5000/uploads/${item.video}`}
                                            type="video/mp4"
                                        />
                                    </video> */}

                                    <button
                                        className="btn btn-primary w-100 mt-2"
                                        onClick={() => isAuth
                                            ? navigate(`/single-brick/${item._id}`)
                                            : toast.error("Please login first")
                                        }
                                    >
                                        See More
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