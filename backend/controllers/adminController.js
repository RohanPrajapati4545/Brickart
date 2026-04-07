const userSchema = require('./../model/userSchema')
const brickSchema = require('./../model/brickSchema')
const brickBookingSchema = require('./../model/brickBookingSchema')
const orderSchema=require("./../model/orderShcema")
//get all users
const getAllUsers = async (req, res) => {
    try {
        const data = await userSchema.find().select("-password")
        if (!data.length) {
            return res.status(400).json({ msg: 'No user found' })
        }
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' })
    }
}
//add all bricks
const addBrick = async (req, res) => {
    try {
        const { brickName, pricePerBrick, category, stock, description, size } = req.body;
         const image = req.files?.image?.[0]?.filename
        const video = req.files?.video?.[0]?.filename

        if (!brickName || !pricePerBrick || !category || !stock || !size) {
            res.status(404).json({ msg: "All fields are required" })
            return
        }

        const data = new brickSchema({
            brickName,
            pricePerBrick,
            category,
            stock,
            description,
            size,
             image,   
            video  
        })
        const dataCreated = await data.save()
        res.status(201).json({ msg: "Bricks added successfully", dataCreated })


    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


//get all bricks
const getAllBricks = async (req, res) => {
    try {
        const data = await brickSchema.find()
        if (data.length === 0) {
            return res.status(404).json({ msg: "no bricks found" })
        }
        res.status(200).json({ msg: "bricks found successfully", data })
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


//delete bricks 
const updateBrick = async (req, res) => {
    try {
        const { id } = req.params
        const { brickName, pricePerBrick, category, stock, description, size } = req.body;

        const brick = await brickSchema.findByIdAndUpdate(
            id, { brickName, pricePerBrick, category, stock, description, size },
            { new: true }
        )
        if (!brick) {
            return res.status(404).json({ msg: "user not found" })
        }

        brick.brickName = brickName,
            brick.pricePerBrick = pricePerBrick,
            brick.category = category,
            brick.stock = stock,
            brick.description = description,
            brick.size = size

        res.status(201).json({ msg: "updated successfully", brick })
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" })
    }
}


//delete bricks
const deleteBrick = async (req, res) => {
    try {
        const { id } = req.params

        const brick = await brickSchema.findById(id)
        if (!brick) {
            return res.status(400).json({ msg: "brick details not found" })
        }

        await brickSchema.findByIdAndDelete(id)
        res.status(201).json({ msg: "brick deleted successfully" })
        return
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" })
    }
}
const getSingleBrick = async (req, res) => {
    try {
        const { id } = req.params

        const brick = await brickSchema.findById(id)

        if (!brick) {
            return res.status(404).json({ msg: "Brick not found" })
        }

        res.status(200).json({ brick })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

const bookBricks = async (req, res) => {
    try {
        const userId = req.user.id   // auth middleware se aayega

        const {
            brickId,
            name,
            contact,
            quantity,
            address,
            deliveryDate,
            message,
            location 
        } = req.body

  
        if (!brickId || !name || !contact || !quantity || !address || !deliveryDate) {
            return res.status(400).json({ msg: "All fields are required" })
        }

       
        const brick = await brickSchema.findById(brickId)
        if (!brick) {
            return res.status(404).json({ msg: "Brick not found" })
        }

      
        if (brick.stock < quantity) {
            return res.status(400).json({ msg: "Not enough stock available" })
        }

      
        const totalAmount = brick.pricePerBrick * quantity

    
        const booking = await brickBookingSchema.create({
            brickId,
            userId,
            name,
            contact,
            quantity,
            address,
            deliveryDate,
            message,
            totalAmount,
            location,
            priceAtPurchase: brick.pricePerBrick
        })

        //  stock reduce
        brick.stock -= quantity
        await brick.save()

        res.status(201).json({
            msg: "Bricks booked successfully",
            booking
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

// GET ALL BRICK BOOKINGS (ADMIN)
const getAllBookings = async (req, res) => {
    try {

        const bookings = await brickBookingSchema.find()
            .populate("userId", "name email contact") // user details
            .populate("brickId", "brickName pricePerBrick image") // brick details
            .sort({ createdAt: -1 })

        if (!bookings.length) {
            return res.status(404).json({ msg: "No bookings found" })
        }

        res.status(200).json({
            msg: "Bookings fetched successfully",
            bookings
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await brickBookingSchema.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, booking });

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error updating status" });
  }
};



const paymentStatus = async (req, res) => {
  try {
    const { orderId } = req.body
    const userId = req.user.id

    const order = await orderSchema.findOne({
      razorpayOrderId: orderId,
      userId          
    })

    if (!order) {
      return res.status(404).json({ msg: "No order found" })
    }

    res.status(200).json({
      status: order.status
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Server error" })
  }
}
module.exports = { getAllUsers,addBrick, getAllBricks, updateBrick, deleteBrick,getSingleBrick,bookBricks, getAllBookings,updateBookingStatus,paymentStatus }