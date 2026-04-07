const express=require("express")
const router=express.Router()

const authController=require("../controllers/authController")
router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/send-otp",authController.sentOtp)
router.post("/verify-otp",authController.verifyOTP)
router.post("/reset-password",authController.resetPassword)
module.exports=router