const brickBooingSchema = require('./../model/brickBookingSchema')

const getUserBooking = async (req, res) => {
    try {

        const bookings = await brickBooingSchema
            .find({ userId: req.user.id })
            .populate('brickId')

        res.status(200).json({
            success: true,
            bookings
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = { getUserBooking }