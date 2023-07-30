import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import NavBar from '../elements/navBar/navBar'
import emailBanner from '../images/emailConfbanner.jpg'
import { useSelector } from 'react-redux'

export default function EmailConf() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate()
    
    const token = new URLSearchParams(window.location.search).get('token')

    const [emailState, setEmailState] = useState('');
    
    useEffect(() => {
        if(user.isConnected)
            navigate('/profile')

            axios.post(`${process.env.REACT_APP_SERVER_LINK}/eConfirmation`, {
                token: token
            }).then(result => {
                setEmailState(result.data.message);
            }).catch(err => {
                if(err.response.data.message)
                    return setEmailState(err.response.data.message);

                return setEmailState(err.response.data);
            });
    
    }, [])

    const Style = {
        main: {
            width: "100%",
            height: "calc(100vh - 60px)",
            textAlign: "center",
            backgroundImage: `linear-gradient(rgba(126, 32, 97, 0.68), rgba(126, 32, 97, 0.68)), url(${emailBanner})`,
            backgroundSize: "cover",
            color: "black",
            position: "relative"
        },
        bg: {
            width: "25%",
            // aspectRatio: 1,
            boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.6)",
            height: '25%',
            backgroundColor: 'white',
            margin: 'auto',
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
        },
        header: {
            fontSize: "1.2rem"
        }
    }

    return (
        <>
            <NavBar/>
            <div style={
                Style.main
            }>
                <div style={Style.bg}>
                    <h1 style={Style.header}>
                    {/* {
                        isConfirmed ? "You Successfuly Confirmed Your Email." : "Your Link has Expired Please Login To Request A New Link."
                    } */}
                    {emailState}
                    </h1>
                    <Link className='button b-purple white' to={"/Login"}>Login</Link>

                </div>
            </div>
        </>
    )
}
