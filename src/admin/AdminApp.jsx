import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {GlobalContext} from "../context"

import Upload from "./upload"

const AdminApp = () => {
    return (
        <GlobalContext.Provider value={{isConnected: false}}>
                admin
            <Routes>
                <Route path='/Upload' element={<Upload />} />
            </Routes>
        </GlobalContext.Provider>
    );
}

export default AdminApp;
