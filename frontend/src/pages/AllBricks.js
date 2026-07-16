import React, { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const API_URL = "https://brickart.onrender.com/api/admin/get-all-bricks"
const CACHE_KEY = "brickart_all_bricks_cache"
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

const AllBricks = ({ hideHeading = false }) => {
    const { isAuth } = useContext(AuthContext)
    const [bricks, setBricks] = useState([])
    const [loading, setLoading] = useState(true)
    const [errored, setErrored] = useState(false)
    const navigate = useNavigate()
    const fetchedOnce = useRef(false)

    const getAllBricks = async () => {
        try {
            // Show cached data instantly (Render free tier cold-starts take 30-50s,
            // so this avoids a blank screen on repeat visits)
            const cached = sessionStorage.getItem(CACHE_KEY)
            if (cached) {
                const { data, timestamp } = JSON.parse(cached)
                if (Date.now() - timestamp < CACHE_TTL && data && data.length) {
                    setBricks(data)
                    setLoading(false)
                }
            }

            const res = await fetch(API_URL)
            const data = await res.json()

            if (!res.ok) {
                if (!cached) {
                    setErrored(true)
                    toast.error((data && data.msg) || "Could not load bricks")
                }
                setLoading(false)
                return
            }

            setBricks(data.data)
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.data, timestamp: Date.now() }))
        } catch (error) {
            console.log(error)
            setErrored(true)
            toast.error("Server is waking up, please retry in a few seconds")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fetchedOnce.current) return
        fetchedOnce.current = true
        getAllBricks()
    }, [])

    const Heading = () => (
        !hideHeading && (
            <div className="mb-3">
                <p className="section-eyebrow">Our catalogue</p>
                <h2 className="section-heading">Bricks in stock, ready to book</h2>
                <p className="section-sub">
                    Prices update by the brick — pick a size, check the rate, and reserve your quantity.
                </p>
            </div>
        )
    )

    if (loading && bricks.length === 0) {
        return (
            <div className="container mt-2">
                <Heading />
                <div className="row g-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div className="col-12 col-md-4" key={i}>
                            <div className="brick-card-new skeleton-card">
                                <div className="skeleton skeleton-img" />
                                <div className="brick-content">
                                    <div className="skeleton skeleton-line w-60" />
                                    <div className="skeleton skeleton-line w-40" />
                                    <div className="skeleton skeleton-line w-80" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!loading && bricks.length === 0) {
        return (
            <div className="container mt-2">
                <Heading />
                <div className="empty-state text-center py-5">
                    <div className="empty-state-icon">🧱</div>
                    <h5>{errored ? "Couldn't reach the yard" : "No bricks listed right now"}</h5>
                    <p className="text-muted mb-3">
                        {errored
                            ? "Our server may be waking up — give it a few seconds and retry."
                            : "New stock gets added regularly. Check back soon, or contact us for a custom order."}
                    </p>
                    <button className="order-btn empty-state-btn" onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-2">
            <Heading />
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={bricks.length > 3}
                speed={1000}
                observer={true}
                observeParents={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            >
                {bricks.map((item) => (
                    <SwiperSlide key={item._id}>
                        <div className="brick-card-new">
                            <div className="brick-img-wrapper">
                                <img
                                    src={`https://brickart.onrender.com/uploads/${item.image}`}
                                    alt={item.brickName}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { e.target.src = "/placeholder-brick.jpg" }}
                                />
                                <span className="brick-badge">{item.brickName}</span>
                            </div>
                            <div className="brick-content">
                                <h5>{item.category}</h5>
                                <p className="price">₹{item.pricePerBrick} / brick</p>
                                <div className="brick-info"><span>📏 {item.size}</span></div>
                                <button
                                    className="order-btn"
                                    onClick={() => isAuth
                                        ? navigate(`/single-brick/${item._id}`)
                                        : toast.error("Please login first")}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default AllBricks