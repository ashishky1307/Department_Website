import React, { useState } from "react";
import './Registration.css'
import axios from 'axios';
import email_icon from '../src/Components/assets/email.png';
import password_icon from '../src/Components/assets/password.png';
import username_icon from '../src/Components/assets/username.png';
import gender_icon from '../src/Components/assets/gender.png';

const Registration = () => {
    
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [message, setMessage] = useState('');

    const validateName = () => {
        if (!name) {
            setNameError("Name cannot be empty");
            return false;
        }
        setNameError("");
        return true;
    };

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

    const validatePhone = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError("Invalid phone number. Must be 10 digits");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePhone()) {
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/register', {
            name,
            branch,
            year,
            email,
            phone,
            gender
        });
        console.log(response.data); 
        setMessage('Registration Successful');
        
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setMessage(error.response.data.error);
        } else {
            console.error('Registration error:', error);
            setMessage('Error registering student');
        }
    }
};   

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Event Registration</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <img src={username_icon} alt="Username Img" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={validateName}
                            required
                        />
                    </div>
                    {nameError && <div className="showerror"><div className="error">{nameError}</div></div>}
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                        </select>
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="Email Img" />
                        <input
                            type="text"
                            placeholder="Email Id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            required
                        />
                    </div>
                    {emailError && <div className="showerror"><div className="error">{emailError}</div></div>}
                    <div className="input">
                        <img src={password_icon} alt="Password Img" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={validatePhone}
                            required
                        />
                    </div>
                    {phoneError && <div className="showerror"><div className="error">{phoneError}</div></div>}
                    <div className="input">
                        <img src={gender_icon} alt="Username Img" />
                        <input
                            type="text"
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {message && <p className="input-error">{message}</p>}
                <div className="submit-container">
                    <button type="submit" className="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;
