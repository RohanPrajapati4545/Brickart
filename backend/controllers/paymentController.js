const orderSchema = require("./../model/orderShcema")
const crypto = require("crypto")
const Razorpay = require("razorpay")


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")

        if (expectedSignature === razorpay_signature) {
            //fetch payment details form Razorpay
            const payment = await razorpay.payments.fetch(razorpay_payment_id)

            //update order in DB
            const order = await orderSchema.findOneAndUpdate(
                { razorpay_order_id },
                {
                    razorpay_payment_id,
                    razorpay_signature,
                    payment_method: payment.method,
                    status: "paid"
                },
                { new: true }
            )
            return res.json({ msg: "Payment verified successfully", payment_method: payment.method, order })
        }
        else {
            return res.status(400).json({ msg: "Invalid signature" })
        }
    } catch (error) {

    }
}

module.exports = { verifyPayment }




