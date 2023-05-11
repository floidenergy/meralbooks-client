import React, {useState} from 'react';
import { Link, redirect } from "react-router-dom";
import axios from "axios"

import lStyle from "../css/auth.module.css";

import { ReactComponent as Logo } from "../images/SVG/meral_books.svg";
import LoginBanner from "../images/loginbanner.jpg";

const Register = () => {
    const [Headers, setHeaders] = useState([
		{ name: "Home", path: "/" || "Home", isActive: true },
		{ name: "Forum", path: "/Forum", isActive: false },
		{ name: "Store", path: "/Store", isActive: false },
		{ name: "Contact", path: "/Contact", isActive: false },
		{ name: "About Us", path: "/About", isActive: false },
	]);

    const [inputError, setInputError] = useState([]);
    const [RequestError, setRequestError] = useState("");

    const HandleError = (e) => {
        if(e.target.type === "submit")
            return;

        //check if it's re-password to check if they are the same
        if(e.target.name === 'repassword'){
            const formData = new FormData(e.currentTarget);
            
            //doesnt match ?
            if(e.target.value !== formData.get('password')
                && !inputError.find(el => el.name === e.target.name)){
                
                e.target.style.borderBottom = "4px solid red"
                return setInputError([...inputError, {name: e.target.name, title: e.target.title}]);
            }
            
            e.target.style.borderBottom = "4px solid cyan"

            
            const Contains = inputError.find(el => el.name === e.target.name);
            if(Contains){
                const newErrorArr = inputError.filter(el => el.name !== e.target.name);
                return setInputError([...newErrorArr])
            }

            return;
        }

        const Contains = inputError.find(el => el.name === e.target.name);
        if(Contains){
            if(!e.target.checkValidity())
                return;
            
            e.target.style.borderBottom = "4px solid cyan"
            const newErrorArr = inputError.filter(el => el.name !== e.target.name);
            return setInputError([...newErrorArr])
        }

        if(!e.target.checkValidity()){
            e.target.style.borderBottom = "4px solid red"
            return setInputError([...inputError, {name: e.target.name, title: e.target.title}]);
        }
        e.target.style.borderBottom = "4px solid cyan"
    }


    const HandleSubmit = async (e) => {
        e.preventDefault();

        if(inputError.length !== 0)
            return;
        
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())


        const {data, status} = await axios.post("http://localhost:3001/register", formData)
        console.log(data);
        if(data.redirection)
            return window.location.pathname = data.redirection;
        
        return setRequestError(data.message);
    }

    return (
        <main className={lStyle.main}>
            <nav className={lStyle.navBar}>
				<Logo className={lStyle.logo} />
				<ul className={lStyle.navList + " bold white"}>
					{Headers.map((header, index) => (
						<li
							key={index}
							className="white"
							onClick={(e) => {
								const headers = Headers.map((h) => {
									if (h.isActive) h.isActive = false;
									return h;
								});
								headers.at(index).isActive = true;
								setHeaders(headers);
							}}
						>
							<Link to={header.path}>{header.name}</Link>
						</li>
					))}
				</ul>
			</nav>

            <div className={lStyle.mainFrame}>
				<form className={lStyle.loginForm + " white"}
                // onChange={HandleError}
                onSubmit={HandleSubmit}
                onBlur={HandleError}
                noValidate>
                    <div className={lStyle.realNameField}>
                        <input
                            type="text"
                            name="fName"
                            id="fName"
                            placeholder="First Name"
                            title='Please Enter Your First Name'
                            autoFocus
                            required
                        />
                        <input
                            type="text"
                            name="lName"
                            id="lName"
                            placeholder="Last Name"
                            title='please Enter Your Last Name'
                            required
                        />
                    </div>
					<input
						type="text"
						name="username"
						id="usernam"
                        pattern='.{5,}'
						placeholder="Username"
                        title='Please Provide A Valid Username Of 5 Characters Minimum'
						required
					/>
                    <input
                        type="email" 
                        name="email"
                        id="email"
                        placeholder='xyz@example.com'
                        title='Please Provide A valid E-mail'
                        required
                    />
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
						autoComplete="current-password"
						required
					/>
                    <input
						type="password"
						name="repassword"
						placeholder="Re-Password"
                        title="Password Doesnt Match The Previous Password"
						required
					/>
                    <div className={lStyle.errorBox}>
                        <ul>
                        {
                            inputError.map((el, index) => <li key={index} className={lStyle.errorMsg}>{el.title}</li>)
                        }
                        </ul>
                        <p className={RequestError ? lStyle.reqMsg : ""}>{RequestError}</p>
                    </div>
					<button type="submit" className={lStyle.subBtn}>
						LOGIN
					</button>
				</form>
				<section className={lStyle.loginBanner}>
					<p className={lStyle.bannerTitle}>
						WELCOME
						<br />
						ABOARD
					</p>
					<p className={lStyle.rInvitation}>
                        Already A Member?{" "}
						<a href="/Login">Login Now.</a>
					</p>
				</section>
			</div>
        </main>
    );
}

export default Register;
