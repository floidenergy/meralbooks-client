// #get inspired from this page https://demo.evershop.io/admin/products/new ** email: demo@gmail.com pass: 123456
// #and this one too: https://demo.evershop.io/

import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from './Login'
import Dashboard from './dashboard/Dashboard'
import Upload from './upload/upload'
import Logout from './Logout'

const AdminApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useSelector(state => state)

  useEffect(() => {
    
    if(!user.isConnected && location.pathname !== '/login') {
      console.log("is not connected");
      navigate('/login')
    } 
    
  }, [location.pathname])

  return (
    <>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Dashboard />} >

        </Route>
        <Route path='/Logout' element={<Logout />} />
      </Routes>
    </>
  )
}

export default AdminApp
