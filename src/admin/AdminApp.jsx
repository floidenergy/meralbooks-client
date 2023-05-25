// #get inspired from this page https://demo.evershop.io/admin/products/new
// #and this one too: https://demo.evershop.io/

import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavBar from '../elements/navBar/navBar'
import Login from './Login'
import Dashboard from './Dashboard'
import Upload from './upload/upload'
import Logout from './Logout'

const AdminApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useSelector(state => state)


  useEffect(() => {
    console.log(user.isConnected);
              
    if (!user.isConnected) {
      console.log("is not connected");
      navigate('/login')
    }
    
  }, [location.pathname])

  return (
    <>
      aaaaa:  {user.user.username}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Upload' element={<Upload />} />
        <Route path='/Logout' element={ <Logout />} />
      </Routes>
    </>
  )
}

export default AdminApp
