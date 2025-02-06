import React, { useState } from "react";
import './Login.css'
import axios from 'axios';
import email_icon from '../src/Components/assets/email.png';
import password_icon from '../src/Components/assets/password.png';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showPassword] = useState(false);
    const [message, setMessage] = useState('');

    const validateEmail = () => {
        if (!email) {
            setEmailError("Email cannot be empty");
            return false;
        } else if (!email.endsWith('@viit.ac.in')) {
            setEmailError("Invalid email. Must end with '@viit.ac.in'");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("Password cannot be empty");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Invalid password. Must contain at least 1 uppercase letter, 1 number, 1 special symbol, and be at least 8 characters long.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateEmail() || !validatePassword()) {
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/login', {
              email,
              password
            });
            
            if (response.status === 200) {
                setMessage('Login Successful');
                setLoginSuccess(true);
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            } else {
                console.log('Login failed:', response.data.message);
                setMessage(response.data.message);
                setLoginSuccess(false);
            }
        } catch (error) {
            console.error('Login error:', error.response.data.message);
            setMessage(error.response.data.message);
            setLoginSuccess(false);
        }
    };    

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="Email Img" />
                        <input
                            type="text"
                            placeholder="Email Id"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={validateEmail}
                        />
                    </div>
                    {emailError && <div className="showerror"><div className="error">{emailError}</div></div>}
                    <div className="input">
                        <img src={password_icon} alt="Password Img" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={validatePassword}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') handleSubmit(event);
                            }}
                        />
                    </div>
                    {passwordError && <div className="showerror"><div className="error">{passwordError}</div></div>}
                </div>
                {loginSuccess && <div className="login-message">Login successful</div>}
                {!loginSuccess && message && <p className="input-error">* {message}</p>}
                <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
                <div className="submit-container">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;