const userSchema = require("./../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const register = async (req, res) => {
    try {
        const { name, email, contact, password, confirm_password } = req.body;
        console.log(req.body)
        // Check required fields
        if (!name || !email || !contact || !password || !confirm_password) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        // Check password match
        if (password !== confirm_password) {
            return res.status(400).json({ msg: "Passwords do not match" })
        }
        // Check existing user
        const emails = await userSchema.findOne({ email })

        if (emails) {
            return res.status(400).json({ msg: "User already exists" })
        }

        // Save user
        const hashedPass = await bcrypt.hash(password, 10)
        const addData = new userSchema({
            name,
            email,
            contact,
            password: hashedPass
        })

        const dataCreated = await addData.save()
        res.status(201).json({ msg: "Registered successfully", dataCreated })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        const userExist = await userSchema.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ msg: " you are not registered user" })
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {

            return res.status(400).json({ msg: "Email or password invalid" })
        }

        const token = jwt.sign(
            { id: userExist._id, email: userExist.email, role: userExist.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "20h" }
        )
        res.status(200).json({ msg: "You have logged in", token, role: userExist.role, user: userExist})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}



// Create transporter for nodemailer 
const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'rohanprajjapati@gmail.com',
      pass: 'tywh ivso gzmx zbhz',
   }
})



//Generate OTP
const generateOTP = () => {
   return crypto.randomInt(100000, 999999).toString()
}

// generate otp and send to users email
const sentOtp = async (req, res) => {
   const { email } = req.body
   const user = await userSchema.findOne({ email })


   if (!user) {
      return res.status(404).json({ msg: "user not found" })
   }


   const otp = generateOTP()
   user.otp = otp                                //store OTP in user Schema
   user.otpExpiry = Date.now() + 15 * 60 * 1000        //OTP expires in 15 minutes

   //save the updated user document with otp
   await user.save()

   // send otp via email
   const mailOptions = {
      from: 'rohanprajjapati@gmail.com',
      to: user.email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is ${otp}. It is valid for 15 minutes.`,

   };

   transporter.sendMail(mailOptions, (error) => {
      if (error) {
         return res.status(500).json({ msg: "Error sending OTP email", error })
      }
      res.status(201).json({ msg: "OTP sent to email" })
   })
}


const verifyOTP = async (req, res) => {

   const { email, otp } = req.body;

   const user = await userSchema.findOne({ email })
   if (!user) {
      return res.status(404).json({ msg: "user not found" })
   }

   if (user.otp !== otp) {
      return res.status(404).json({ msg: "Invalid OTP" })
   }

   const currentTime = Date.now()
   if (currentTime > user.otpExpiry) {
      return res.status(404).json({ msg: "OTP has expired" })
   }

   user.otp = null
   user.otpExpiry = null

   await user.save()
   res.status(200).json({ msg: 'OTP verified successfully' })

}


const resetPassword = async (req, res) => {
   try {
      const { email, new_password, confirm_password } = req.body;
      const user = await userSchema.findOne({ email })

      if(!user){
         return res.status(404).json({msg:"User not found"})
      }
      if(user.otp!==null|| user.otpExpiry!==null){
         return res.status(404).json({msg:"OTP verification required"})
      }
      if (new_password !== confirm_password) {
         return res.status(404).json({ msg: "new and confirm password should be same" })
      }
      const hashPass = await bcrypt.hash(new_password, 10)
      user.password = hashPass
      await user.save()
     res.status(200).json({msg:"Password reset successfully"})
   } catch (error) {
      console.log(error)
   }
}

module.exports = { register, login,sentOtp,verifyOTP,resetPassword  }