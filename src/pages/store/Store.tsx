import { Routes, Route } from 'react-router-dom'

import NavBar from '../../elements/navBar/navBar'
import Footer from '../../elements/footer/Footer'

import Index from './index/Index'
import Search from './search/Search'
import MProfile from './mProfile/MProfile'
import Profile from './profile/Profile'

const Store = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/Search/:type' element={<Search />} />
        <Route path='/Profile/:type' element={<Profile />} />
        <Route path='/MProfile/*' element={<MProfile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Store
