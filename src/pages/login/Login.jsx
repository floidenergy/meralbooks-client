/** @format */

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { login } from '../../store/features/user'

import lStyle from '../../css/auth.module.css'

import { BiShow, BiHide } from 'react-icons/bi'
import { TiThMenu } from 'react-icons/ti'
import { ReactComponent as Logo } from '../../images/SVG/meral_books.svg'

const Login = () => {
  const dispatcher = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector(state => state.user);

  useEffect(() => {
    if(user.isConnected){
      if(user.isAdmin){
        return window.location.href = "http://admin.localhost:3000"
      }

      navigate('/Profile')
    }
  }, [navigate])

  const [Headers, setHeaders] = useState([
    {
      name: 'Home',
      path: '/' || 'Home',
      isActive: true
    },
    {
      name: 'Forum',
      path: '/Forum',
      isActive: false
    },
    {
      name: 'Store',
      path: '/Store',
      isActive: false
    },
    {
      name: 'Contact',
      path: '/Contact',
      isActive: false
    },
    {
      name: 'About Us',
      path: '/About',
      isActive: false
    }
  ])

  const [RequestError, setRequestError] = useState('')
  const [navbarClasses, setNavbarClasses] = useState({
    isActive: false,
    classes: lStyle.navBar
  })
  const [PasswordType, SetPasswordType] = useState({
    type: 'password',
    Icon: BiShow
  })

  const HandleSubmit = async e => {
    e.preventDefault();
    setRequestError("");

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

    // if(!formData.username || formData.password)

    try {
      const { data } = await axios.post(
        'http://localhost:3001/login',
        formData,
        {
          withCredentials: true
        }
      )

      console.log(data);
      dispatcher(login(data))
      if(data.isAdmin){
        return window.location.href = "http://admin.localhost:3000"
      }
      navigate('/')
    } catch (err) {
      console.log(err );

      let errorMessage = ""

      if(err.response)
        errorMessage = err.response.data.message
      else
        errorMessage = err.message
      
      console.log(errorMessage);
      return setRequestError(errorMessage);
      // return setRequestError(err)
    }
  }

  return (
    <main className={lStyle.main}>
      <div
        className={lStyle.navButton}
        onClick={e => {
          if (navbarClasses.isActive) {
            setNavbarClasses({ isActive: false, classes: lStyle.navBar })
          } else {
            setNavbarClasses({
              isActive: true,
              classes: lStyle.navBar + ' ' + lStyle.ActiveMenu
            })
          }
        }}
      >
        <TiThMenu />
      </div>
      <nav className={navbarClasses.classes}>
        <Logo className={lStyle.logo} />
        <ul className={lStyle.navList + ' bold'}>
          {Headers.map((header, index) => (
            <li
              key={index}
              className='white'
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
          ))}{' '}
        </ul>
      </nav>

      <div className={lStyle.mainFrame}>
        <form
          className={lStyle.loginForm + ' white'}
          onSubmit={HandleSubmit}
        >
          <input
            type='text'
            name='username'
            id='usernam'
            placeholder='Username/E-mail'
            required
            autoFocus
          />{' '}
          <div className={lStyle.PassSec}>
            <input
              type={PasswordType.type}
              name='password'
              id='password'
              placeholder='Password'
              // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              // title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
              autoComplete='current-password'
              required
            />
            <PasswordType.Icon
              className={lStyle.PassIcon}
              onClick={() => {
                if (PasswordType.type === 'password') {
                  SetPasswordType({ type: 'text', Icon: BiHide })
                } else {
                  SetPasswordType({ type: 'password', Icon: BiShow })
                }
              }}
            />
          </div>
          <label htmlFor='keepConnection'>
            <input
              type='checkbox'
              name='keepConnection'
              className={lStyle.keepConnection}
              id='keepConnection'
              value='true'
            />
            Stay Connected
          </label>
          <div className={lStyle.errorBox}>
            <p className={RequestError ? lStyle.reqMsg : ''}>
              {RequestError}
            </p>
          </div>
          <button type='submit' className={lStyle.subBtn}>
            LOGIN
          </button>
        </form>
        <section className={lStyle.loginBanner}>
          <p className={lStyle.bannerTitle}>
            GLAD TO SEE
            <br />
            YOU AGAIN
          </p>
          <p className={lStyle.rInvitation}>
            Ain't A Member Yet? <a href='/Register'>Register Now.</a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Login
