import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../css/globalStyle.css'


import NavBar from '../elements/navBar/navBar'
import Login from './Login'
import Dashboard from './Dashboard'
import Upload from './upload'


const AdminApp = () => {
  const location = useLocation();
  // localStorage.clear();
  const navigate = useNavigate();
  const user = useSelector(state => state)


  useEffect(() => {
    if (!user.isConnected) 
      navigate('/login')
    
  }, [location.pathname])

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Upload' element={<Upload />} />
      </Routes>
    </>
  )
}

export default AdminApp
