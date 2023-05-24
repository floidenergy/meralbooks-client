import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {login} from '../store/features/user'

import style from '../css/adminAuth.module.css'
import lStyle from '../css/auth.module.css'

import { TiThMenu } from 'react-icons/ti'


function Login () {
	const dispatcher = useDispatch();
	const navigate  = useNavigate();

  const [requestError, setRequestError] = useState('')
	const [navbarClasses, setNavbarClasses] = useState({
    isActive: false,
    classes: lStyle.navBar
  })

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

	const handelInputValue = (e) => {
		if(e.target.value){
			e.target.classList.add(style['has-val'])
		}else{
			e.target.classList.remove(style['has-val']);
		}
	}

	const handelSubmit = async (e) => {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

		try {
			const { data } = await axios.post(
				'http://localhost:3001/admin/login',
				formData,
        {
          withCredentials: true
        }
			)
      

			console.log(data);
			dispatcher(login(data));
			
			navigate('/Dashboard');
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
    <div>
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
      <nav className={navbarClasses.classes + " b-dark-white"} style={{boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.2)"}}>
        {/* <Logo className={lStyle.logo} /> */}
        <ul className={lStyle.navList + ' bold'}>
          {Headers.map((header, index) => (
            <li
              key={index}
              className='black'
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
      <div className={style.limiter}>
        <div className={style['container-login100']}>
          <div className={style['wrap-login100']}>
            <form
              className={style['login100-form'] + ' ' + style['validate-form']}
							onSubmit={handelSubmit}
            >
              <span className={style['login100-form-title'] + " " + style['p-b-43']}>
                Please Login to continue
              </span>

              <div
                className={
                  style['wrap-input100'] + ' ' + style['validate-input']
                }
                data-validate='Valid email is required: ex@abc.xyz'
              >
                <input
                  className={style['input100']}
                  type='text'
                  name='username'
									onBlur={handelInputValue}
                />
                <span className={style['focus-input100']}></span>
                <span className={style['label-input100']}>
                  Username & Email
                </span>
              </div>

              <div
                className={
                  style['wrap-input100'] + ' ' + style['validate-input']
                }
                data-validate='Password is required'
              >
                <input
                  className={style['input100']}
                  type='password'
                  name='password'
									onBlur={handelInputValue}
                />
                <span className={style['focus-input100']}></span>
                <span className={style['label-input100']}>Password</span>
              </div>

              <div className={style['container-login100-form-btn']}>
                <button
                  type='submit'
                  className={style['login100-form-btn'] + ' button b-purple'}
                >
                  Login
                </button>
              </div>

              <div className={style['container-error']}>
                <p>{requestError}</p>
              </div>
            </form>
            <div
              className={style['Banner'] + ' ' + style['login100-more']}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
