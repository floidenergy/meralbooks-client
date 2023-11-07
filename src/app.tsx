import { Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import Store from './pages/store/Store'
import Forum from './pages/forum/Forum'
import Contact from './pages/contact/Contact.tsx'
import About from './pages/about/About'

import './sass/globalStyle.css'
import Profile from './pages/profile/Profile'

import Login from './pages/login/Login.js'
import Register from './pages/register/Register'
import EmailConf from './pages/emailConf/EmailConf.tsx'
import Logout from './pages/Logout'

import Default from './pages/default/Default.tsx'


const MainApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Store/*' element={<Store />} />
      <Route path='/Forum/*' element={<Forum />} />
      <Route path='/Contact/*' element={<Contact />} />
      <Route path='/About' element={<About />} />

      <Route path='/Email/*' element={<EmailConf />} />
      <Route path='/Profile/*' element={<Profile />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/Register' element={<Register />} />
      <Route path='*' element={<Default />} />
    </Routes>
  )
}

export default MainApp
