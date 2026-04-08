import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./../../App.css";

const MyBooking = () => {

    const { token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try {
            const res = await fetch("https://brickart.onrender.com/api/user/user-booking", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                setBookings(data.bookings || []);
            }

        } catch (error) {
            toast.error("Failed to load bookings");
        }
    };

    useEffect(() => {
        if (token) getBookings();
    }, [token]);

    return (
        <div className="booking-page">

            <div className="container">

                <h3 className="booking-title mb-5">My Brick Bookings</h3>

                <div className="row">

                    {bookings.length === 0 ? (
                        <p className="text-center">No Bookings Found</p>
                    ) : (

                        bookings.map((b) => (

                            <div className="col-md-4 mb-4" key={b._id}>

                                <div className="booking-card">

                                    {/* IMAGE */}
                                    <img
                                        src={`https://brickart.onrender.com/uploads/${b.brickId?.image}`}
                                        className="booking-img"
                                        alt=""
                                    />

                                    {/* CONTENT */}
                                    <div className="booking-content">

                                        <h5>
                                            {b.brickId?.brickName || "No Brick Found"}
                                        </h5>

                                        <p><b>Quantity:</b> {b.quantity}</p>

                                        <p>
                                            <b>Price:</b> ₹{b.brickId?.pricePerBrick} / brick
                                        </p>

                                        <p>
                                            <b>Total Amount:</b> ₹{b.totalAmount}
                                        </p>

                                        <p>
                                            <b>Delivery Date:</b>{" "}
                                            {b.deliveryDate &&
                                                b.deliveryDate !== "0001-01-01T00:00:00.000Z"
                                                ? new Date(b.deliveryDate).toLocaleDateString()
                                                : "Not Set"}
                                        </p>

                                        {/* STATUS */}
                                        <div className="status-wrapper">

                                            {/* BOOKING STATUS */}
                                            <div className={`status-box booking ${b.status}`}>
                                                <span className="label">Booking Status</span>
                                                <span className="value">{b.status}</span>
                                            </div>

                                            {/* PAYMENT STATUS */}
                                            <div className={`status-box payment ${b.paymentStatus}`}>
                                                <span className="label">Payment Status</span>
                                                <span className="value">{b.paymentStatus}</span>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
};

export default MyBooking;