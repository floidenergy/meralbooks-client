/****************************************************
 * pick app function called athe the first time when 
 * the app runs so he catches the subdomain in page
 * URL and decide what element to render
 * **************************************************/

import {Domain} from "./routeConstant"

export const pickApp = () =>{
    const subdomain = window.location.hostname.split('.')[0];
    const main = Domain.find(app => app.main);

    if(!main) throw new Error("must have main app");

    if(subdomain === "") return main.app;

    const app = Domain.find(app => app.subdomain === subdomain);

    if(!app) return main.app;
    return app.app;
}