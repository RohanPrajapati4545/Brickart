const express=require("express")
const router=express.Router()
const authMiddleware=require("./../middlewares/authMiddleware")
const userController=require("../controllers/userController")
router.get("/user-booking",authMiddleware,userController.getUserBooking)
module.exports=router