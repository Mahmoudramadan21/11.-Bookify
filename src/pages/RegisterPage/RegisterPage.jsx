import React, { useEffect, useState, useRef } from 'react';
import './RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userRegister } from '../../store/actions/userActions';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [data, setData] = useState({
        username: '',
        'first-name': '',
        'last-name': '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [formErrors, setFormErrors] = useState({
        username: '',
        'first-name': '',
        'last-name': '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const { loading, userInfo, error } = useSelector(state => state.userRegister);

    const navigate = useNavigate();

    // Refs for fields
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (error === "User with this email or username already exists") {
            setErrorMsg("Username or email is already taken");
        }
    }, [error]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 8 && hasLetter && hasNumber;
    };

    const validate = () => {
        let isValid = true;
        let errors = {
            username: '',
            'first-name': '',
            'last-name': '',
            email: '',
            password: ''
        };

        if (!data.username) {
            errors.username = 'Username is required';
            isValid = false;
        } else if (data.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
            isValid = false;
        }

        if (!data['first-name']) {
            errors['first-name'] = 'First name is required';
            isValid = false;
        } else if (data['first-name'].length < 2) {
            errors['first-name'] = 'First name must be at least 2 characters long';
            isValid = false;
        }

        if (!data['last-name']) {
            errors['last-name'] = 'Last name is required';
            isValid = false;
        } else if (data['last-name'].length < 2) {
            errors['last-name'] = 'Last name must be at least 2 characters long';
            isValid = false;
        }

        if (!data.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(data.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        if (!data.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (!validatePassword(data.password)) {
            errors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
            isValid = false;
        } else if (data.password !== confirmPassword) {
            errors.password = "Passwords don't match";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleKeyPress = (e, nextFieldRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextFieldRef) {
                nextFieldRef.current.focus();
            } else {
                submitHandler(e); // If it's the last field, submit the form
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validate()) {
            dispatch(userRegister(data));
        } else {
            setErrorMsg('Please fix the errors above.');
        }
    };

    return (
        <div className="login-signup">
            <div className="container">
                <h2>Register</h2>
                {errorMsg && <div className="error-msg">{errorMsg}</div>}
                <form className="login-signup-form" onSubmit={submitHandler}>
                    <div className="field">
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            id="username"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value.trim() })}
                            onKeyPress={(e) => handleKeyPress(e, firstNameRef)}
                        />
                        {formErrors.username && <div className="error">{formErrors.username}</div>}
                    </div>

                    <div className="name-field">
                        <div className="field">
                            <label htmlFor="first-name">First name </label>
                            <input
                                type="text"
                                id="first-name"
                                ref={firstNameRef}
                                value={data['first-name']}
                                onChange={(e) => setData({ ...data, 'first-name': e.target.value.trim() })}
                                onKeyPress={(e) => handleKeyPress(e, lastNameRef)}
                            />
                            {formErrors['first-name'] && <div className="error">{formErrors['first-name']}</div>}
                        </div>
                        <div className="field">
                            <label htmlFor="last-name">Last name </label>
                            <input
                                type="text"
                                id="last-name"
                                ref={lastNameRef}
                                value={data['last-name']}
                                onChange={(e) => setData({ ...data, 'last-name': e.target.value.trim() })}
                                onKeyPress={(e) => handleKeyPress(e, emailRef)}
                            />
                            {formErrors['last-name'] && <div className="error">{formErrors['last-name']}</div>}
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email </label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value.trim() })}
                            onKeyPress={(e) => handleKeyPress(e, passwordRef)}
                        />
                        {formErrors.email && <div className="error">{formErrors.email}</div>}
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value.trim() })}
                            onKeyPress={(e) => handleKeyPress(e, confirmPasswordRef)}
                        />
                        {formErrors.password && <div className="error">{formErrors.password}</div>}
                    </div>

                    <div className="field">
                        <label htmlFor="confirm-password">Confirm password </label>
                        <input
                            type="password"
                            id="confirm-password"
                            ref={confirmPasswordRef}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value.trim())}
                            onKeyPress={(e) => handleKeyPress(e, null)}
                        />
                    </div>

                    <div className="field">
                        <input type="submit" id="submit" value="Sign-up" />
                    </div>
                </form>
                <div className="login">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
