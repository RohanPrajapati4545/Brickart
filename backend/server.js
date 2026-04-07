const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
require("./config/db")

const AdminRoute = require("./routes/AdminRoute")
const AuthRoute = require("./routes/AuthRoute")
const UserRoute = require("./routes/UserRoute")
const orderRoute=require("./routes/OrderRoute")
const paymentRoute=require("./routes/PaymentRoute")



const cors = require("cors")
const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}
app.use("/uploads", express.static("uploads"))

app.use(express.json())
app.use(cors(corsOption))
app.use("/api/admin", AdminRoute)
app.use("/api/auth", AuthRoute)
app.use("/api/user",UserRoute)
app.use('/api/order',orderRoute)
app.use('/api/payment',paymentRoute)





app.listen(process.env.PORT  || 5000, () => {
    console.log("server is running on port 5000")
})