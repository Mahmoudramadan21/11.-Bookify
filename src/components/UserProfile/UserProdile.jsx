import React, { useEffect, useState } from 'react'
import "./UserProfile.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/actions/userActions';

function UserProfile() {
    const { loading, userInfo, error } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        "first-name": "",
        "last-name": "",
        password: ""
    })

    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorMsg, setErrorMsg] = useState("");

    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        "first-name": "",
        "last-name": "",
        password: ""
    });

    useEffect(() => {
        if (userInfo) {
            setUserData({
                username: userInfo.username || "",
                email: userInfo.email || "",
                "first-name": userInfo.name.split(" ")[0] || "",
                "last-name": userInfo.name.split(" ")[1] || "",
                password: "",
            })
            setConfirmPassword("")
        }
    }, [userInfo])

    useEffect(() => {
        if (error === "User with this email or username already exists") {
            setErrorMsg("Username or email is already taken"); // Display the error from Redux store
        }
    }, [error]);

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Ensure password contains at least one letter, one number, and is 8 characters long
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 8 && hasLetter && hasNumber;
    };

    const validate = () => {
        let isValid = true;
        let errors = {
            username: "",
            email: "",
            "first-name": "",
            "last-name": "",
            password: ""
        }

        // Username validation
        if (!userData.username) {
            errors.username = 'Username is required';
            isValid = false;
        } else if (userData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
            isValid = false;
        }

        // Email validation
        if (!userData.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(userData.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        // First and Last Name validation
        if (!userData['first-name']) {
            errors['first-name'] = 'First name is required';
            isValid = false;
        } else if (userData['first-name'].length < 2) {
            errors['first-name'] = 'First name must be at least 2 characters long';
            isValid = false;
        }

        if (!userData['last-name']) {
            errors['last-name'] = 'Last name is required';
            isValid = false;
        } else if (userData['last-name'].length < 2) {
            errors['last-name'] = 'Last name must be at least 2 characters long';
            isValid = false;
        }

        // Password validation
        if (!userData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (!validatePassword(userData.password)) {
            errors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
            isValid = false;
        } else if (userData.password !== confirmPassword) {
            errors.password = "Passwords don't match";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const submitHandler = (e) => {
        e.preventDefault()

        if (validate()) {
            dispatch(updateUserProfile(userData));
            console.log(userData, { confirmPassword }, { errorMsg }, validate())

        } else {
            setErrorMsg('Please fix the errors above.');
        }

    }



    return (
        <div className="form-container">
            <h2 className="form-title">User Profile</h2>
            <form className="user-profile-form form" onSubmit={submitHandler}>
                <div className="form-field">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value.trim() })}
                    />
                    {formErrors.username && <div className="error">{formErrors.username}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="firestName" className="form-label">First name</label>
                    <input
                        type="text"
                        id="firestName"
                        className="form-input"
                        value={userData['first-name']}
                        onChange={(e) => setUserData({ ...userData, "first-name": e.target.value.trim() })}
                    />
                    {formErrors['first-name'] && <div className="error">{formErrors['first-name']}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-input"
                        value={userData['last-name']}
                        onChange={(e) => setUserData({ ...userData, "last-name": e.target.value.trim() })}
                    />
                    {formErrors['last-name'] && <div className="error">{formErrors['last-name']}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value.trim() })}
                    />
                    {formErrors.email && <div className="error">{formErrors.email}</div>}

                </div>
                <div className="form-field">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value.trim() })}
                    />
                    {formErrors.password && <div className="error">{formErrors.password}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    />
                </div>
                <div className="form-field">
                    <input type="submit" id="submit" value="Continue" className="form-submit" />
                </div>
            </form>
        </div>
    )
}

export default UserProfile;
