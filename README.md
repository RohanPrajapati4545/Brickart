# Brickart – MERN Stack Brick Ordering Platform
A full-featured, production-ready brick ordering web application built using the MERN stack. 
BrickArt streamlines the entire brick purchasing process — from browsing and ordering to real-time tracking — with secure authentication 
and role-based access control.

---

## Features

### Authentication & Security

* JWT-based authentication for secure user sessions
* Password hashing using bcrypt
* Role-Based Access Control (RBAC) for Admin & Users
* Protected routes and APIs

### User Functionalities

* User registration & login system
* Browse available bricks/products
* Place orders seamlessly
* Track order/booking status in real-time
* Forget password option available with nodemailer 

### Admin Functionalities

* Admin dashboard to manage orders
* Update order status (Processing, Shipped, Delivered)
* Manage users and products
* Secure admin-only routes

### Payment Integration

* Integrated Razorpay payment gateway
* Secure online transactions
* Payment status handling

### Responsive Design

* Fully responsive UI for mobile, tablet, and desktop
* Smooth user experience across devices

---

## Tech Stack

**Frontend:**
* React.js
*  CSS/Bootstrap

**Backend:**
* Node.js
* Express.js

**Database:**
* MongoDB

**Authentication & Security:**
* JSON Web Token (JWT)
* bcrypt

**Other Integrations:**

* Nodemailer (Email service)
* Razorpay (Payment Gateway)

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/RohanPRajapati4545/brickart.git

# Navigate to project folder
cd brickart

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd ../frontend
npm install

# Run backend server
cd ../backend
npm start

# Run frontend
cd ../frontend
npm start
```

---

## Environment Variables

Create a `.env` file in backend folder and add:

```
MONGO_URL=your_mongoDB_url
JWT_SECRET_KEY= your_jwt_secret_key
RAZORPAY_KEY_ID= rzp_test_....
RAZORPAY_KEY_SECRET=13uCV.....
```

---

## 📌 Key Highlights

* 🔥 Production-level architecture
* 🔄 RESTful API design
* ⚡ Fast and scalable backend
* 🛡️ Secure authentication system
* 💡 Clean and maintainable code structure
* 📊 Real-world project for portfolio

---

## 📸 Future Improvements

* Add product reviews & ratings
* Implement order analytics dashboard
* Add multi-vendor support
* Improve UI animations

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---


