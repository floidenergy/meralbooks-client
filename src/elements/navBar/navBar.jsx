import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'

import { useSelector } from 'react-redux'

import nStyle from './navbar.module.css'
import Logo from '../../images/SVG/meral_books.svg'

import { AiOutlineShoppingCart, AiOutlineLogout } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const location = useLocation().pathname
  const MobileNav = useRef(null)

  const [Headers, setHeaders] = useState([
    { name: 'Home', path: '/' || 'Home', isActive: true },
    { name: 'Forum', path: '/Forum', isActive: false },
    { name: 'Store', path: '/Store', isActive: false },
    { name: 'Contact', path: '/Contact', isActive: false },
    { name: 'About Us', path: '/About', isActive: false }
  ])

  const [navbarClasses, setNavbarClasses] = useState({
    isActive: false,
    classes: nStyle.navBar
  })

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
    setNavbarClasses({ isActive: false, classes: nStyle.navBar })
  }, [location])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        MobileNav.current &&
        !MobileNav.current.contains(event.target) &&
        navbarClasses.isActive
      ) {
        console.log(navbarClasses.isActive);
        setNavbarClasses({ isActive: false, classes: nStyle.navBar });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside)
    // }

  }, [MobileNav, navbarClasses.isActive])

  const AuthButtons = () => {
    return (
      <div className={nStyle.authDiv}>
        <Link to={'/Login'} className={nStyle.authButton}>
          Log in
        </Link>
        <Link to={'/Register'} className={nStyle.authButton}>
          Sign up
        </Link>
      </div>
    )
  }

  const Profile = () => {
    return (
      <div className={nStyle.profileDiv}>
        <Link to={'/Cart'} className={nStyle.Profile_Icons}>
          <AiOutlineShoppingCart />
        </Link>
        {/* <Link to={'/Profile'} className={nStyle.Profile_Icons}>
          <CgProfile />
        </Link> */}
        <Link to={'/Logout'} className={nStyle.Profile_Icons}>
          <AiOutlineLogout />
        </Link>
      </div>
    )
  }

  return (
    <>
      <div
        ref={MobileNav}
        className={nStyle.navButton}
        onClick={e => {
          if (navbarClasses.isActive) {
            setNavbarClasses({ isActive: false, classes: nStyle.navBar })
          } else {
            setNavbarClasses({
              isActive: true,
              classes: nStyle.navBar + ' ' + nStyle.Active
            })
          }
        }}
        onBlur={() => {
          console.log('blur')
          if (navbarClasses.isActive) {
            setNavbarClasses({ isActive: false, classes: nStyle.navBar })
          } else {
            setNavbarClasses({
              isActive: true,
              classes: nStyle.navBar + ' ' + nStyle.Active
            })
          }
        }}
      >
        <TiThMenu />
      </div>
      <nav className={navbarClasses.classes}>
        {/* <img src={logo} alt='' className='logo' /> */}
        <img src={Logo} className={nStyle.logo} />

        <ul className={nStyle.navList + ' bold black'}>
          {Headers.map((header, index) => (
            <li
              key={index}
              className={header.isActive ? nStyle.active : ''}
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
        <div className={nStyle.icons}>
          {user.isConnected ? <Profile /> : <AuthButtons />}
        </div>
      </nav>
    </>
  )
}

export default NavBar
