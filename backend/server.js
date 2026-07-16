const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
require("./config/db")

const AdminRoute = require("./routes/AdminRoute")
const AuthRoute = require("./routes/AuthRoute")
const UserRoute = require("./routes/UserRoute")
const orderRoute = require("./routes/OrderRoute")
const paymentRoute = require("./routes/PaymentRoute")

const cors = require("cors")

// Fixed origins (local dev + your main production domain)
const allowedOrigins = [
    'http://localhost:3000',
    'https://brickart-delta.vercel.app',
]

// Vercel makes a new preview URL for every branch/PR, e.g.
// https://brickart-git-main-rohanprajjapati-5449s-projects.vercel.app
// https://brickart-<hash>-rohanprajjapati-5449s-projects.vercel.app
// This regex allows any of those under your Vercel team, so you don't
// have to keep adding URLs to the array above every time you push.
const vercelPreviewPattern = /^https:\/\/brickart-[a-z0-9-]+-rohanprajjapati-5449s-projects\.vercel\.app$/

const corsOption = {
    origin: (origin, callback) => {
        // allow tools like Postman / server-to-server calls with no origin
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
            return callback(null, true)
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}

// cors() first, so every route (including preflight OPTIONS) gets the headers
app.use(cors(corsOption))
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/admin", AdminRoute)
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use('/api/order', orderRoute)
app.use('/api/payment', paymentRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port 5000")
})