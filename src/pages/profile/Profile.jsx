import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { edit } from '../../store/features/user'

import NavBar from '../../elements/navBar/navBar'
import Footer from '../../elements/footer/Footer'

import Style from './profile.module.css'

import sPP from '../../images/tempProfilePic.jpg'

const Page = () => {
  const user = useSelector(state => state.user);
  const dispacher = useDispatch();

  const [tempProfilePic, setTempProfilePic] = useState({image: sPP, changed: false});
  const [ErrorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if (user.user.profilePic === null) {
      setTempProfilePic({image: user.user.profilePic, changed: false})
    }
  }, [])

  const imageUploaded = e => {
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      setTempProfilePic({image: reader.result, changed: true})
    }
    reader.onerror = err => {
      console.log('error: ', err)
    }
  }

  const handelChangeSubmit = async e => {
    e.preventDefault()
    setErrorMessage('')

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

    if(tempProfilePic.changed)
      formData.profilePic = tempProfilePic.image;

    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_SERVER_LINK}/profile-edit`,
        formData,
        {
          withCredentials: true
        }
      )
  
      if(status === 202)
        dispacher(edit(data.user))
      
      if(data.message)
        setErrorMessage(data.message);
  
    } catch (err) {
      let errorMessage = ""

      if(err.response)
        errorMessage = err.response.data.message
      else
        errorMessage = err.message
      
      return setErrorMessage(errorMessage);
      
    }
  }

  return (
    <>
      <NavBar />
      <main className={Style.main}>
        <section>
          <div className={Style.profile}>
            <div className={Style.picDiv}>
              <label htmlFor='ProfilePic' className={Style.profilePic}>
                <img src={tempProfilePic.image} className={Style.pic} />
                <input type='file' id='ProfilePic' onChange={imageUploaded} />
              </label>
            </div>
            <p className={Style.fullName}>
              {user.user.name.fName} {user.user.name.lName}
            </p>
            <p className={Style.username}>@{user.user.username}</p>
          </div>
          <form className='info' onSubmit={handelChangeSubmit}>
            <div className={Style.fullName}>
              <label htmlFor='fName'>
                First name
                <input
                  type='text'
                  name='fName'
                  defaultValue={user.user.name.fName}
                  placeholder='First name'
                  id='fName'
                />
              </label>
              <label htmlFor='lName'>
                Last name
                <input
                  type='text'
                  name='lName'
                  defaultValue={user.user.name.lName}
                  placeholder='Last name'
                  id='lName'
                />
              </label>
            </div>
            <hr />
            <label htmlFor='email'>
              E-mail
              <input
                type='email'
                name='email'
                defaultValue={user.user.email}
                id='E-mail'
              />
            </label>
            <label htmlFor='dob'>
              birth Date
              <input
                type='date'
                name='dob'
                defaultValue={user.user.dob}
                id='dob'
              />
            </label>
            <label htmlFor='password'>
              password
              <input
                type='password'
                name='vrfPassword'
                id='password'
                placeholder='Enter your password before saving your info'
                required
              />
            </label>
            <hr />
            <div className={Style.divisioner}>
              <p>Password</p>
              <Link to='/changePassword'>Edit</Link>
            </div>
            <div className={Style.divisioner}>
              <p>Shipping address</p>
              <Link draggable='true' to='/ShippingAddress'>
                Edit
              </Link>
            </div>
            <div className={Style.errorMessage}>{ErrorMessage}</div>
            <button type='submit' className='button b-purple white'>
              save
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user.user) {
      navigate('/Login')
    }
  })

  return <>{user.isConnected ? <Page /> : <></>}</>
}

export default Profile
