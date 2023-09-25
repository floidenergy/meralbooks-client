import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { RootState } from '../../store/store'

import lStyle from './auth.module.css'

import { TiThMenu } from 'react-icons/ti'
import { BiShow, BiHide } from 'react-icons/bi'

import { ReactComponent as Logo } from '../../images/SVG/meral_books.svg'

interface InputError {
  name: string,
  title: string
}

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user.user) {
      navigate('/Profile')
    }
  }, [navigate, user.user])

  const [Headers, setHeaders] = useState([
    { name: 'Home', path: '/' || 'Home', isActive: true },
    { name: 'Forum', path: '/Forum', isActive: false },
    { name: 'Store', path: '/Store', isActive: false },
    { name: 'Contact', path: '/Contact', isActive: false },
    { name: 'About Us', path: '/About', isActive: false }
  ])

  const [navbarClasses, setNavbarClasses] = useState({
    isActive: false,
    classes: lStyle.navBar
  })
  const [PasswordType, SetPasswordType] = useState({
    type: 'password',
    Icon: BiShow
  })
  const [inputError, setInputError] = useState<InputError[]>([])
  const [RequestError, setRequestError] = useState('')

  const HandleError = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.target.type === 'submit') return

    if (e.target.name === 'repassword') {
      const formData = new FormData(e.currentTarget)

      //doesnt match ?
      if (
        e.target.value !== formData.get('password') &&
        !inputError.find((el) => el.name === e.target.name)
      ) {
        e.target.style.borderBottom = '4px solid red'
        return setInputError([
          ...inputError,
          { name: e.target.name, title: e.target.title }
        ])
      }

      e.target.style.borderBottom = '4px solid cyan'

      const Contains = inputError.find(el => el.name === e.target.name)
      if (Contains) {
        const newErrorArr = inputError.filter(el => el.name !== e.target.name)
        return setInputError([...newErrorArr])
      }

      return
    }

    const Contains = inputError.find(el => el.name === e.target.name)
    if (Contains) {
      if (!e.target.checkValidity()) return

      e.target.style.borderBottom = '4px solid cyan'
      const newErrorArr = inputError.filter(el => el.name !== e.target.name)
      return setInputError([...newErrorArr])
    }

    if (!e.target.checkValidity()) {
      e.target.style.borderBottom = '4px solid red'
      return setInputError([
        ...inputError,
        { name: e.target.name, title: e.target.title }
      ])
    }
    e.target.style.borderBottom = '4px solid cyan'
  }

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputError.length !== 0) return

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

    const { data } = await axios.post(
      `${import.meta.env.REACT_APP_SERVER_LINK}/account/register`,
      formData,
      { withCredentials: true }
    )
    console.log(data)
    if (data.redirection) return (window.location.pathname = data.redirection)

    return setRequestError(data.message)
  }

  return (
    <main className={lStyle.main}>
      <div
        className={lStyle.navButton}
        onClick={() => {
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
        <ul className={lStyle.navList + ' bold white'}>
          {Headers.map((header, index) => (
            <li
              key={index}
              className='white'
              onClick={() => {
                const headers = Headers.map(h => {
                  if (h.isActive) h.isActive = false
                  return h
                })
                  headers[index].isActive = true
                setHeaders(headers)
              }}
            >
              <Link to={header.path}>{header.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={lStyle.mainFrame}>
        <form
          className={lStyle.loginForm + ' white'}
          // onChange={HandleError}
          onSubmit={HandleSubmit}
          onBlur={HandleError}
          noValidate
        >
          <div className={lStyle.realNameField}>
            <input
              type='text'
              name='fName'
              id='fName'
              placeholder='First Name'
              title='Please Enter Your First Name'
              autoFocus
              required
            />
            <input
              type='text'
              name='lName'
              id='lName'
              placeholder='Last Name'
              title='please Enter Your Last Name'
              required
            />
          </div>
          <input
            type='text'
            name='username'
            id='usernam'
            pattern='.{5,}'
            placeholder='Username'
            title='Please Provide A Valid Username Of 5 Characters Minimum'
            required
          />
          <input
            type='email'
            name='email'
            id='email'
            placeholder='xyz@example.com'
            title='Please Provide A valid E-mail'
            required
          />
          <select
            name='gender'
            className={lStyle.gender}
            title='Please Provide A valid gender'
            required
          >
            <option value='' disabled selected hidden>
              I&apos;am a
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <div className={lStyle.dob}>
            <input type='date' name='dob' id='dob' />
          </div>
          <div className={lStyle.PassSec}>
            <input
              type={PasswordType.type}
              name='password'
              id='password'
              placeholder='Password'
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
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
          <input
            type='password'
            name='repassword'
            placeholder='Re-Password'
            title='Password Doesnt Match The Previous Password'
            required
          />
          <div className={lStyle.errorBox}>
            <ul>
              {inputError.map((el, index) => (
                <li key={index} className={lStyle.errorMsg}>
                  {el.title}
                </li>
              ))}
            </ul>
            <p className={RequestError ? lStyle.reqMsg : ''}>{RequestError}</p>
          </div>
          <button type='submit' className={lStyle.subBtn}>
            REGISTER
          </button>
        </form>
        <section className={lStyle.loginBanner}>
          <p className={lStyle.bannerTitle}>
            WELCOME
            <br />
            ABOARD
          </p>
          <p className={lStyle.rInvitation}>
            Already A Member? <a href='/Login'>Login Now.</a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Register
