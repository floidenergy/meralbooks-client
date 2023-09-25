import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { RootState } from "../../store/store"

import NavBar from '../../elements/navBar/navBar'
import Style from './style.module.css'

export default function EmailConf() {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate()

    const token = new URLSearchParams(window.location.search).get('token')

    const [emailState, setEmailState] = useState('');

    useEffect(() => {
        if (user.isConnected)
            navigate('/profile')

        axios.post(`${import.meta.env.VITE_SERVER_LINK}/eConfirmation`, {
            token
        }).then(result => {
            setEmailState(result.data.message);
        }).catch(err => {
            if (err.response.data.message)
                return setEmailState(err.response.data.message);

            return setEmailState(err.response.data);
        });

    }, [navigate, token, user.isConnected])

    return (
        <>
            <NavBar />
            <div className={Style.main}>
                <div className={Style.bg}>
                    <h1 className={Style.header}>
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
