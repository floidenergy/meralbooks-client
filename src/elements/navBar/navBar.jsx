import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'
import {ReactComponent as Logo} from '../../images/SVG/meral_books.svg'
import { useGlobalContext } from '../../context'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

const NavBar = () => {
  const { isConnected } = useGlobalContext();
  const [Headers, setHeaders] = useState([
    { name: 'Home', path: '/', isActive: true },
    { name: 'Forum', path: '/Forum', isActive: false },
    { name: 'Store', path: '/Store', isActive: false },
    { name: 'Contact', path: '/Contact', isActive: false },
    { name: 'About Us', path: '/About', isActive: false }
  ])

  const AuthButtons = () => {
    return (
      <>
        <Link to={"/Auth#logIn"} className='authButton'>Log in</Link>
        <Link to={"/Auth#signUp"} className='authButton'>Sign up</Link>
      </>
    )
  }

  const Profile = () => {
    return (
      <>
        <Link to={'/Cart'} className='Profile-Icons'>
          <AiOutlineShoppingCart />
        </Link>
        <Link to={'/Profile'} className='Profile-Icons'>
          <CgProfile />
        </Link>
      </>
    )
  }

  return (
    <nav className='b-white'>
      {/* <img src={logo} alt='' className='logo' /> */}
      <Logo className='logo' />

      <ul className='navList bold black'>
        {Headers.map((header, index) => (
          <li
            key={index}
            className={header.isActive ? 'black active' : 'black'}
            onClick={(e) => {
                const headers = Headers.map(h => {if(h.isActive) h.isActive = false; return h;});
                headers.at(index).isActive = true;
                setHeaders(headers)
            }}
          >
            <Link to={header.path}>{header.name}</Link>
          </li>
        ))}
      </ul>
      <div className='icons'>{isConnected ? <Profile /> : <AuthButtons />}</div>
    </nav>
  )
}

export default NavBar
