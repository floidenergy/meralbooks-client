/** @format */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store/store';
import { pickApp } from "./utils/routerPicker";

const CurrentApp = pickApp();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Provider store={store} >
			<CurrentApp />
		</Provider>
	</BrowserRouter>
);
