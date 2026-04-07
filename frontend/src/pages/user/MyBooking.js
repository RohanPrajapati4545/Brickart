import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

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

                <h3 className="booking-title mb-4">🧱 My Brick Bookings</h3>

                <div className="row">

                    {bookings.length === 0 ? (
                        <p>No Bookings Found</p>
                    ) : (

                        bookings.map((b) => (

                            <div className="col-md-4" key={b._id}>

                                <div className="booking-card">

                                    {/* IMAGE */}
                                    <img
                                        src={`https://brickart.onrender.com/uploads/${b.brickId?.image}`}
                                        className="booking-img" alt=""
                                    />

                                    {/* DETAILS */}
                                    <div className="booking-content">

                                        <h5>{b.brickId?.brickName || "No Brick Found"}</h5>

                                        <p>
                                            <strong>Qty:</strong> {b.quantity}
                                        </p>
                                        <p>
                                            <strong>Brick Price:</strong>  ₹{b.brickId?.pricePerBrick} per brick
                                            
                                            </p>
                                        <p>
                                            <strong>Total:</strong> ₹{b.totalAmount}
                                        </p>

                                        <p>
                                            <strong>Delivery:</strong>{" "}
                                            {b.deliveryDate && b.deliveryDate !== "0001-01-01T00:00:00.000Z"
                                                ? new Date(b.deliveryDate).toLocaleDateString()
                                                : "Not Set"}
                                        </p>

                                        {/* STATUS */}
                                        <div className="d-flex justify-content-between align-items-center mt-2">

                                            <span className={`status ${b.status}`}>
                                                {b.status}
                                            </span>

                                            <span className={`payment ${b.paymentStatus}`}>
                                                {b.paymentStatus}
                                            </span>

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