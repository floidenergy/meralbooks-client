import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {
  AiOutlineMail,
  AiOutlineInstagram as InstagramIcon
} from 'react-icons/ai'
import { TfiFacebook as FacebookIcon } from 'react-icons/tfi'

import footerBanner from './readingBanner.jpg'

import {ReactComponent as Logo} from '../../images/SVG/full_logo.svg'

import './footer.css'

function Footer () {
  const [reqStatu, setReqState] = useState('');

  const handleMailSub = (e) => {
    e.preventDefault();
    console.log();
    axios.post(`${process.env.REACT_APP_SERVER_LINK}/subMail`, {
      email: e.target[0].value
    }).then(result => {
      setReqState('Mail Added Successfuly')
    }).catch(err => {
      setReqState("Something went wrong")
    })
  }


  return (
    <footer className='b-purple white'>
      <img src={footerBanner} alt='' />
      <div className='footer-menue '>
        <Logo className='footer-logo' />
        <div className='mainMenu'>
          <div className='customer-care'>
            <p className='title bold'>CUSTOMER CARE</p>
            <ul>
              <li>
                <Link to='/FAQ'>FAQ</Link>
              </li>
              <li>
                <Link to='/FAQ'>Shipping & Returns</Link>
              </li>
              <li>
                <Link to='/FAQ'>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className='mail-subscription'>
            <p className='title bold'>SIGN UP AND SAVE</p>
            <p className='description'>
              Subscribe To Get Special Offers. Free Giveaways. And Once-In-A
              Lifetime Deals
            </p>
            <div className='sub-input'>
              <form onSubmit={handleMailSub}>
                <input
                  type='email'
                  name='email-subscription'
                  className='email-subscription'
                  placeholder='Enter Your Email'
                />
              </form>
              <AiOutlineMail className='icon' />
            </div>
            <p>{reqStatu}</p>
          </div>
        </div>
        <div className='socialMedia-contacts'>
          <a
            href='https://bit.ly/3n3uuWz'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon className='sm-icon' />
          </a>
          <a
            href='https://bit.ly/43Z5CQp'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookIcon className='sm-icon' />
          </a>
        </div>
      </div>
      <p className='cpywrite'>&copy; 2023 Meral Books All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
