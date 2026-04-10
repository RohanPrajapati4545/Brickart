import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Layout from './Layout'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import AdminsDashboard from '../pages/BrickAdmin/AdminsDashboard'
import AdminsLayout from '../pages/BrickAdmin/AdminsLayout'
import ManageBricks from '../pages/BrickAdmin/ManageBricks'
import AddBricks from '../pages/BrickAdmin/AddBricks'
import AllUsers from '../pages/BrickAdmin/AllUsers'
import SingleBrick from '../pages/SingleBrick'
import BrickBook from '../pages/BrickBook'
import BookingRequest from '../pages/BrickAdmin/BookingRequest'
import AllBricks from '../pages/AllBricks'
import OurWork from '../pages/OurWork'
import Email from '../pages/auth/Email'
import Recovery from '../pages/auth/Recovery'
import Reset from '../pages/auth/Reset'
import MyBooking from '../pages/user/MyBooking'
import Parent from '../practice/ReactMemo'


const AllRoutes = () => {
    return (


        <>
            <BrowserRouter>

                <Routes>
                    <Route path='/' element={
                        <Layout><Home /></Layout>
                    } />
                    <Route path='/about' element={
                        <Layout><About /></Layout>
                    } />
                    <Route path='/contact' element={
                        <Layout><Contact /></Layout>
                    } />
                      <Route path='/work-gallery' element={
                        <Layout><OurWork/></Layout>
                    } />
                      <Route path='/single-brick/:id' element={
                        <Layout><SingleBrick /></Layout>
                    } />
                       <Route path='/brick-book/:id' element={
                        <Layout><BrickBook /></Layout>
                    } />
                     <Route path='/all-bricks' element={
                        <Layout><AllBricks /></Layout>
                    } />
                         <Route path='/user/my-booking' element={
                        <Layout><MyBooking /></Layout>
                    } />
                  
                       <Route path='/parent' element={
                        <Parent />
                    } />
                  


                    <Route path='/register' element={
                        <Register />
                    } />
                    <Route path='/login' element={
                        <Login />
                    } />

                    <Route path='/admin' element={<AdminsLayout />}>
                        <Route index element={<AdminsDashboard />} />
                        <Route path='manage-bricks' element={<ManageBricks />} />
                        <Route path='add-bricks' element={<AddBricks />} />
                         <Route path='all-users' element={<AllUsers />} />
                          <Route path='booking-request' element={<BookingRequest />} />

                    </Route>

                     <Route path='/forgot-password' element={<Email />}></Route>
                    <Route path='/recovery' element={<Recovery />}></Route>
                    <Route path='/reset-password' element={<Reset />}></Route>
                </Routes>

            </BrowserRouter>

        </>
    )
}

export default AllRoutes