import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import nStyle from '../../css/navbar.module.css'
import { ReactComponent as Logo } from '../../images/SVG/meral_books.svg'
import { useGlobalContext } from '../../context'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

const NavBar = () => {
  const { isConnected } = useGlobalContext()
  const [Headers, setHeaders] = useState([
    { name: 'Home', path: '/' || 'Home', isActive: true },
    { name: 'Forum', path: '/Forum', isActive: false },
    { name: 'Store', path: '/Store', isActive: false },
    { name: 'Contact', path: '/Contact', isActive: false },
    { name: 'About Us', path: '/About', isActive: false }
  ])

  const location = useLocation().pathname

  useEffect(() => {
    let headers = Headers.map(h => {
      if (h.isActive) h.isActive = false
      return h
    })
    headers = headers.map(h => {
      if (h.path === location) h.isActive = true

      return h
    })
    setHeaders(headers)
  }, [location])

  const AuthButtons = () => {
    return (
      <>
        <Link to={'/Login'} className={nStyle.authButton}>
          Log in
        </Link>
        <Link to={'/Register'} className={nStyle.authButton}>
          Sign up
        </Link>
      </>
    )
  }

  const Profile = () => {
    return (
      <>
        <Link to={'/Cart'} className={nStyle.Profile_Icons}>
          <AiOutlineShoppingCart />
        </Link>
        <Link to={'/Profile'} className={nStyle.Profile_Icons}>
          <CgProfile />
        </Link>
      </>
    )
  }
   
  return (
    <nav className={nStyle.navBar} >
      {/* <img src={logo} alt='' className='logo' /> */}
      <Logo className={nStyle.logo} />

      <ul className={nStyle.navList + " bold black"}>
        {Headers.map((header, index) => (
          <li
            key={index}
            className={header.isActive ? nStyle.active : 'black'}
            onClick={e => {
              const headers = Headers.map(h => {
                if (h.isActive) h.isActive = false
                return h
              })
              headers.at(index).isActive = true
              setHeaders(headers)
            }}
          >
            <Link to={header.path}>{header.name}</Link>
          </li>
        ))}
      </ul>
      <div className={nStyle.icons}>{isConnected ? <Profile /> : <AuthButtons />}</div>
    </nav>
  )
}

export default NavBar
