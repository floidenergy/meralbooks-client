/*****************************************************
 * This file is to make an object of the domain name
 * so you can create subdomain with wished app
 * ***************************************************
 * 
 * you just need to add another element array like this
 * {
 *      subdomain: "wishedSubdomain",
 *      app: ReactComponentForTheEnteryPoint,
 *      main: toDeclareIfItsTheMainApp (usualyFalse)
 * }
 */

import MainApp from '../app';
import AdminApp from '../admin/AdminApp'

export const Domain = [
    {
        subdomain: "www",
        app: MainApp,
        main: true
    },
    {
        subdomain: 'admin',
        app: AdminApp,
        main: false
    }
]