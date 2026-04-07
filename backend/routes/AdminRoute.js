const express=require("express")
const router=express.Router()
const authMiddleware=require("../middlewares/authMiddleware")
const adminMiddleware=require("../middlewares/adminMiddleware")
const upload = require("../middlewares/upload")
const adminController=require("./../controllers/adminController")
router.get("/all-users",authMiddleware,adminMiddleware,(adminController.getAllUsers))
router.post("/add-brick",authMiddleware,adminMiddleware,upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),(adminController.addBrick))
router.get("/get-all-bricks",(adminController.getAllBricks))
router.put("/update-brick/:id",authMiddleware,adminMiddleware,(adminController.updateBrick))
router.delete("/delete-brick/:id",authMiddleware,adminMiddleware,(adminController.deleteBrick))
router.get("/single-brick/:id",authMiddleware,(adminController.getSingleBrick))
router.post("/brick-booking",authMiddleware,(adminController.bookBricks))
router.get("/get-all-bookings",authMiddleware,adminMiddleware,(adminController.getAllBookings))
router.put("/update-booking/:id",authMiddleware,adminMiddleware,(adminController.updateBookingStatus))
router.post("/payment-status",authMiddleware,adminController.paymentStatus)
module.exports=router