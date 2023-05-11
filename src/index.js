/** @format */
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios"

import { pickApp } from "./utils/routerPicker";

const CurrentApp = pickApp();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
      		<CurrentApp />
		</BrowserRouter>
	</React.StrictMode>
);
