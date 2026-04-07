const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require: true
    }, 
    email:{
        type:String,
        require: true
    },
    contact:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    role:{
        type:String,
        enum:['user', 'admin'], //list ke form me data pass krne pr enum lete he array form me
        default:'user'
    },
       otp:{
        type:String,
    },
    otpExpiry:{
        type:Date,
    }
})
const User=new mongoose.model("User", userSchema)
module.exports=User