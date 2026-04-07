const brickSchema=require("./../model/brickSchema")
const userSchema=require("./../model/userSchema")
const orderSchema=require("./../model/orderShcema")
const Razorpay=require("razorpay")

const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder= async(req,res)=>{
    try {
        const {brickId, quantity}=req.body
        const userId=req.user.id

        const brick=await brickSchema.findById(brickId)
        
        if(!brick){
            return res.status(404).json({msg:"brick not found"})
        }
         const totalAmount = brick.pricePerBrick * quantity
        const existingOrder= await orderSchema.findOne({
            userId,
            brickId,
            status:"paid"
        })

        if(existingOrder){
            return res.status(400).json({msg:"brick already purchased"})
        }

        //generate receipt
        const receipt ="receipt_"+Date.now()

        //create razorpay order
        const options={
            amount: totalAmount * 100, 
            currency: "INR",
            receipt: receipt
        }
        
        const razorpayOrder=await razorpay.orders.create(options)
        const newOrder=new orderSchema({
            userId,
            brickId,
            quantity,
            razorpay_order_id:razorpayOrder.id,
            receipt,
            amount: totalAmount,
        })
        await newOrder.save()
        res.status(200).json({msg:"Order created successfully",order:razorpayOrder, dbOrder:newOrder})
    } catch (error) {
         console.log(error)
res.status(500).json({msg:"error creating order"})
    }
}
module.exports={createOrder}