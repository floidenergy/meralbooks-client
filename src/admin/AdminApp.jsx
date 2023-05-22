import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Upload from "./upload"
import NavBar from '../elements/navBar/navBar';

const AdminApp = () => {
    // localStorage.clear();
    const navigate = useNavigate();
    const user = useSelector(state => state);
    console.log(user);

    // if(!user)
    //     navigate('/login');

    // if(!user.user.isAdmin)
    //     return window.location.href = "http://localhost:3000/profile"

    return (
        <>
            <NavBar />
                admin
            <Routes>
                <Route path='/Upload' element={<Upload />} />
            </Routes>
        </>
    );
}

export default AdminApp;
