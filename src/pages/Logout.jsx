import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../store/features/user'

const Logout = () => {
  const dispatcher = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    

    axios
    .get(`${process.env.REACT_APP_SERVER_LINK}/Logout`, {
      withCredentials: true
    })
    .then(result => {
      // console.log(result);
      if (result.status === 200) {
        dispatcher(logout())
        navigate('/')
      }
    })
  });

  return <p>redirection</p>
}

export default Logout
