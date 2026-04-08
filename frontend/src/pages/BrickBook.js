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
        const res = await fetch("https://brickart.onrender.com/api/admin/brick-booking", {
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
            const res = await fetch('https://brickart.onrender.com/api/order/create-order', {

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
            const res = await fetch("https://brickart.onrender.com/api/payment/verify-payment", {
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
            const res = await fetch("https://brickart.onrender.com/api/admin/payment-status", {
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
    <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f4f7f6, #e8f1ee)",
        padding: "50px 0"
    }}>

        <div className="container" style={{ maxWidth: "650px" }}>

            <div className="card border-0 shadow-lg p-4" style={{ borderRadius: "20px" }}>

                <h3 className="text-center mb-4" style={{
                    color: "#2e5f55",
                    fontWeight: "700"
                }}>
                    Book Your Bricks
                </h3>

                <form>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control mb-3"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        className="form-control mb-3"
                        value={formData.contact}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        className="form-control mb-3"
                        value={formData.quantity}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Delivery Address"
                        className="form-control mb-3"
                        value={formData.address}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    <input
                        type="date"
                        name="deliveryDate"
                        className="form-control mb-3"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    {/* LOCATION BUTTON */}
                    <button
                        type="button"
                        className="w-100 mb-3"
                        onClick={getLocation}
                        style={{
                            borderRadius: "30px",
                            border: "1px solid #2e5f55",
                            color: "#2e5f55",
                            padding: "10px",
                            background: "transparent",
                            fontWeight: "500"
                        }}
                    >
                        📍 Share my current location
                    </button>

                    {/* LOCATION SHOW */}
                    {location && (
                        <div style={{
                            background: "#e8f1ee",
                            borderRadius: "10px",
                            padding: "10px",
                            textAlign: "center",
                            marginBottom: "10px"
                        }}>
                            📍 Location Captured <br />
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                        </div>
                    )}

                    {/* MAP */}
                    {location && (
                        <iframe
                            width="100%"
                            height="200"
                            style={{
                                border: 0,
                                borderRadius: "15px",
                                marginBottom: "15px"
                            }}
                            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
                            title="map"
                        ></iframe>
                    )}

                    <textarea
                        name="message"
                        placeholder="Optional message..."
                        className="form-control mb-3"
                        value={formData.message}
                        onChange={handleChange}
                        style={{ borderRadius: "10px" }}
                    />

                    {/* PAYMENT BUTTON */}
                    <button
                        type="button"
                        onClick={() => handleGetService(id)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "30px",
                            border: "none",
                            background: "#2e5f55",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "16px",
                            transition: "0.3s"
                        }}
                    >
                        Make Payment
                    </button>

                </form>

            </div>
        </div>
    </div>
)
}

export default BrickBook