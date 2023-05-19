/** @format */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { pickApp } from "./utils/routerPicker";

const CurrentApp = pickApp();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
		<BrowserRouter>
      		<CurrentApp />
		</BrowserRouter>
);
