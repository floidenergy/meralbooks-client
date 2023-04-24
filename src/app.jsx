import React from 'react';
import { GlobalContext } from './context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const App = ({children}) => {
    return (
        <GlobalContext.Provider value={{isConnected: true}}>
            
            {children}
        </GlobalContext.Provider>
    );
}

export default App;
