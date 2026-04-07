const express =require ('express')
const router =express.Router()


const paymentControler=require('./../controllers/paymentController')
router.post('/verify-payment',(paymentControler.verifyPayment))
module.exports=router