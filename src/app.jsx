import React from 'react'
// import { GlobalContext } from './context';
import { Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store'

import Home from './pages/Home'
import Store from './pages/Store'
import Forum from './pages/Forum'
import Contact from './pages/Contact'
import About from './pages/About'

import './css/globalStyle.css'
import Cart from './pages/Cart'
import Profile from './pages/Profile'

import Login from './pages/Login'
import Register from './pages/Register'
import EmailConf from './pages/EmailConf'

const MainApp = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Store' element={<Store />} />
        <Route path='/Forum' element={<Forum />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/About' element={<About />} />

        <Route path='/Cart' element={<Cart />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Email' element={<EmailConf />} />

        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Provider>
  )
}

export default MainApp
