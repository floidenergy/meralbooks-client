import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../elements/navBar/navBar'
import emailBanner from '../images/emailConfbanner.jpg'
export default function EmailConf() {
    const isConfirmed = new URLSearchParams(window.location.search).get('c')

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
                    {
                        isConfirmed ? "You Successfuly Confirmed Your Email." : "Your Link has Expired Please Login To Request A New Link."
                    }
                    </h1>
                    <Link className='button b-purple white' to={"/Login"}>Login</Link>

                </div>
            </div>
        </>
    )
}
