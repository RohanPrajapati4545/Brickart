import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { toast } from 'react-toastify'

const BookingRequest = () => {

    const { token } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])

    const getAllBookings = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/get-all-bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.msg)
                return
            }

            setBookings(data.bookings)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (token) {
            getAllBookings()
        }
    }, [token])

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/admin/update-booking/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.msg);
                return;
            }

            toast.success(`Booking ${status}`);
            getAllBookings(); // 🔄 refresh data

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">

            <h2 className="mb-4 text-center">All Booking Requests</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">

                    <thead className="table-dark">
                        <tr>
                            <th>User</th>
                            <th>Contact</th>
                            <th>Brick</th>
                            <th>Image</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                             <th>Payment</th>
                            <th>Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id}>

                                {/* USER */}
                                <td>{b.name}</td>

                                <td>{b.contact}</td>

                                {/* BRICK */}
                                <td>{b.brickId?.brickName}</td>

                                {/* IMAGE */}
                                <td>
                                    <img
                                        src={`http://localhost:5000/uploads/${b.brickId?.image}`}
                                        width="70"
                                        height="50"
                                        style={{ objectFit: "cover" }}
                                        alt=""
                                    />
                                </td>

                                {/* BOOKING DATA */}
                                <td>{b.quantity}</td>
                                <td>{b.brickId?.pricePerBrick}</td>

                                <td>₹{b.totalAmount}</td>

                                <td>
                                    {new Date(b.deliveryDate).toLocaleDateString()}
                                </td>

                                {/* STATUS */}
                                <td>

                                    {b.status === "pending" ? (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => updateStatus(b._id, "confirmed")}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => updateStatus(b._id, "cancelled")}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`badge 
      ${b.status === "confirmed" && "bg-success"} 
      ${b.status === "delivered" && "bg-primary"} 
      ${b.status === "cancelled" && "bg-danger"}
    `}>
                                            {b.status}
                                        </span>
                                    )}

                                </td>
                                <td></td>

                                {/* LOCATION MAP */}
                                <td>
                                    {b.location ? (
                                        <iframe
                                            width="200"
                                            height="120"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            src={`https://www.google.com/maps?q=${b.location.lat},${b.location.lng}&output=embed`}
                                        ></iframe>
                                    ) : "N/A"}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default BookingRequest