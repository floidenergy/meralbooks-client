/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BiShow, BiHide } from 'react-icons/bi'

import lStyle from '../css/auth.module.css'

import { ReactComponent as Logo } from '../images/SVG/meral_books.svg'

const Login = () => {
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
  const [PasswordType, SetPasswordType] = useState({
    type: 'password',
    Icon: BiShow
  })

  const HandleSubmit = async e => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

    try {
      const { data } = await axios.post('http://localhost:3001/login', formData)

      console.log(data)

      if (data.redirection) return (window.location.pathname = data.redirection)
    } catch (err) {
      return setRequestError(err.response.data.message)
    }
  }

  return (
    <main className={lStyle.main}>
      <nav className={lStyle.navBar}>
        <Logo className={lStyle.logo} />
        <ul className={lStyle.navList + ' bold white'}>
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
          noValidate
        >
          <input
            type='text'
            name='username'
            id='usernam'
            placeholder='Username/E-mail'
            required
          />{' '}
          {/* TODO: MAKE A SYSTEM WHERE YOU CAN REVEAL USER PASSWORD */}
          <div className={lStyle.PassSec}>
            <input
              type={PasswordType.type}
              name='password'
              id='password'
              placeholder='Password'
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
              autoComplete='current-password'
              required
            />
            <PasswordType.Icon
              className={lStyle.PassIcon}
              onClick={() => {
                if(PasswordType.type === "password"){
                  SetPasswordType({type: "text", Icon: BiHide});
                }else{
                  SetPasswordType({type: "password", Icon: BiShow});
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
            <p className={RequestError ? lStyle.reqMsg : ''}>{RequestError}</p>
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
            Ain't A Member Yet?
            <a href='/Register'>Register Now.</a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Login
