import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import NavBar from '../elements/navBar/navBar'
import Footer from '../elements/footer/Footer'

import Style from '../css/profile.module.css'

import sPP from '../images/tempProfilePic.jpg'

const Page = () =>{

    const user = useSelector(state => state.user)
    const [tempProfilePic, setTempProfilePic] = useState(sPP)

    if (user.user.profilePic === null) {
        setTempProfilePic(user.user.profilePic);
    }

    const base64String = "";

    const imageUploaded = (e) => {
      var file = e.target.value;
      var reader = new FileReader();
      console.log("next");
       
      reader.onload = function () {
          base64String = reader.result.replace("data:", "")
              .replace(/^.+,/, "");
   
          imageBase64Stringsep = base64String;
   
          // alert(imageBase64Stringsep);
          console.log(base64String);
      }
      reader.readAsDataURL(file);
  }

    return (
        <>
          <NavBar />
          <main className={Style.main}>
            <section>
              <div className={Style.profile}>
                <div className={Style.picDiv}>
                  <label htmlFor='ProfilePic' className={Style.profilePic}>
                    <img src={tempProfilePic} className={Style.pic} />
                  </label>
                  <input type='file' name='profilePic' id='ProfilePic' onChange={(e) => {
                    
                  }}/>
                </div>
                <p className={Style.fullName}>
                  {user.user.name.fName} {user.user.name.lName}
                </p>
                <p className={Style.username}>@{user.user.username}</p>
              </div>
              <form className='info'>
                <div className={Style.fullName}>
                  <label htmlFor='fName'>
                    First name
                    <input
                      type='text'
                      name='fName'
                      value={user.user.name.fName}
                      placeholder='First name'
                      required
                      id='fName'
                    />
                  </label>
                  <label htmlFor='lName'>
                    Last name
                    <input
                      type='text'
                      name='lName'
                      value={user.user.name.lName}
                      placeholder='Last name'
                      id='lName'
                      required
                    />
                  </label>
                </div>
                <hr />
                <label htmlFor='username'>
                  username
                  <input
                    type='text'
                    name='username'
                    value={user.user.username}
                    placeholder='username'
                    id='username'
                    required
                  />
                </label>
                <label htmlFor='email'>
                  E-mail
                  <input
                    type='email'
                    name='email'
                    value={user.user.email}
                    id='E-mail'
                    required
                  />
                </label>
                <label htmlFor='dob'>
                  birth Date
                  <input type='date' name='dob' value={user.user.dob} id='dob' />
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
        console.log('biiim')
        navigate('/Login')
    }
    console.log('aaa')
  })

  return(
    <>
    {user.isConnected ? <Page /> : <></>}
    </>
  )

  
}

export default Profile
