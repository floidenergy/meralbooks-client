import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Store from './pages/Store';
import Forum from './pages/Forum';
import Contact from './pages/Contact';
import About from './pages/About';

import App from "./app";

import NavBar from "./elements/navBar/navBar";
import { useGlobalContext } from "./context";

import './globalStyle.css';
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App>
                <NavBar/>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/Store' element={<Store />}/>
                        <Route path='/Forum' element={<Forum />}/>
                        <Route path='/Contact' element={<Contact />}/>
                        <Route path='/About' element={<About />}/>

                        <Route path='/Cart' element={<Cart />}/>
                        <Route path='/Profile' element={<Profile />}/>
                    </Routes>
            </App>
        </BrowserRouter>


    </React.StrictMode>
)
