import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const BrickBook = () => {
    const [location, setLocation] = useState(null)
    const { token } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        quantity: "",
        address: "",
        deliveryDate: "",
        message: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const handleBookingAfterPayment = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/admin/brick-booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                brickId: id,
                ...formData,
                location
            })
        })

        const data = await res.json()

        if (!res.ok) {
            toast.error(data.msg)
            return
        }

        toast.success("Booking Successful 🎉")
        navigate('/user/my-booking')

    } catch (error) {
        console.log(error)
        toast.error("Booking failed")
    }
}




    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                toast.success("Location captured")
            },
            (error) => {
                toast.error("Location access denied")
            }
        )
    }


    const createOrder = async (brickId) => {
        try {
            const res = await fetch('http://localhost:5000/api/order/create-order', {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body:
                    JSON.stringify({
                        brickId,
                        quantity: formData.quantity
                    })
            })
            const data = await res.json()
            console.log("ORDER API RESPONSE 👉", data) 
            if (!res.ok) {
                toast.error(data.msg)
                return
            }
            return data.order
        } catch (error) {
            console.log(error)
        }
    }

    const verifyPayment = async (paymentData) => {
        try {
            const res = await fetch("http://localhost:5000/api/payment/verify-payment", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(paymentData)
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.msg)
                return
            }  
             await handleBookingAfterPayment()
            return data.order
            
        } catch (error) {
            console.log(error)
        }
    }

    //btn clicked function
    const handleGetService = async (brickId) => {

        const order = await createOrder(brickId)
       
        if (!order) { return }
 setOrderId(order.id)
        const options = {

            key: "rzp_test_SQbC05iUCHd8pO",
            amount: order.amount,
            currency: order.currency,
            name: "My Service website",
            description: "Service Payment",
            order_id: order.id,
            handler: function (response) {
                const paymentData = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                }
                verifyPayment(paymentData)
            },
            theme: {
                color: "#0800ff"
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const paymentStatus = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/payment-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ orderId })
            })

            const data = await res.json()

           console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (orderId) {
            paymentStatus()
        }
    }, [orderId])


    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <div className="card shadow p-4">

                <h3 className="text-center mb-4">Book Bricks</h3>

                <form >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control mb-3"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="contact"
                        placeholder="Enter Contact"
                        className="form-control mb-3"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Enter Quantity"
                        className="form-control mb-3"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        className="form-control mb-3"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="deliveryDate"
                        className="form-control mb-3"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary mb-3 w-100"
                        onClick={getLocation}
                    >
                        📍 Share my current location
                    </button>

                    {location && (
                        <div className="alert alert-success text-center">
                            📍 Location Captured <br />
                            Lat: {location.lat.toFixed(5)} <br />
                            Lng: {location.lng.toFixed(5)}
                        </div>
                    )}

                    {location && (
                        <div className="mb-3">
                            <iframe
                                width="100%"
                                height="200"
                                style={{ border: 0, borderRadius: "10px" }}
                                loading="lazy"
                                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
                            ></iframe>
                        </div>
                    )}
                    <textarea
                        name="message"
                        placeholder="Message (optional)"
                        className="form-control mb-3"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type='button' onClick={() => handleGetService(id)} required>Make Payment</button>

                   

                </form>

            </div>
        </div>
    )
}

export default BrickBook