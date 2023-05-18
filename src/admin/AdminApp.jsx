import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Upload from "./upload"

const AdminApp = () => {
    return (
        <>
                admin
            <Routes>
                <Route path='/Upload' element={<Upload />} />
            </Routes>
        </>
    );
}

export default AdminApp;
