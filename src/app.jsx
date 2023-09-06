import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import Store from './pages/store/Store'
import Forum from './pages/forum/Forum'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'

import './sass/globalStyle.css'
import Cart from './pages/cart/Cart'
import Profile from './pages/profile/Profile'

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import EmailConf from './pages/EmailConf'
import Logout from './pages/Logout'

const MainApp = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Store/*' element={<Store />} />
        <Route path='/Forum/*' element={<Forum />} />
        <Route path='/Contact/*' element={<Contact />} />
        <Route path='/About' element={<About />} />

        <Route path='/Cart/*' element={<Cart />} />
        <Route path='/Email/*' element={<EmailConf />} />
        <Route path='/Profile/*' element={<Profile />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
  )
}

export default MainApp
