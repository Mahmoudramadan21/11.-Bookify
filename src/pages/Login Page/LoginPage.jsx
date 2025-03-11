import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/actions/userActions';
import Loader from '../../components/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const { loading, userInfo, error } = useSelector(state => state.userLogin);
    const { cartItems } = useSelector(state => state.cart);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (error === "No active account found with the given credentials") {
            setErrorMsg("Username or password is invalid");
        }
    }, [error]);

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 8 && hasLetter && hasNumber;
    };

    const validate = () => {
        let isValid = true;
        let errors = { username: "", password: "" };

        if (!data.username) {
            errors.username = "Username is required";
            isValid = false;
        } else if (data.username.length < 3) {
            errors.username = "Username must be at least 3 characters long";
            isValid = false;
        }

        if (!data.password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (!validatePassword(data.password)) {
            errors.password = "Password must be at least 8 characters long and contain both letters and numbers";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleKeyDown = (e, field) => {
        if (e.key === 'Enter') {
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            if (index < form.elements.length - 1) {
                form.elements[index + 1].focus();
                e.preventDefault();
            } else {
                submitHandler(e);
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validate()) {
            dispatch(userLogin(data));
        } else {
            setErrorMsg('Please fix the errors above.');
        }
    };

    return (
        loading ? <Loader /> : (
            <div className="login-signup">
                <div className="container">
                    <h2>Login</h2>
                    {errorMsg && <div className="error-msg">{errorMsg}</div>}
                    <form className="login-signup-form" onSubmit={submitHandler}>
                        <div className="field">
                            <label htmlFor="username">Username </label>
                            <input
                                type="text"
                                id='username'
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value.trim() })}
                                onKeyDown={(e) => handleKeyDown(e, 'username')}
                            />
                            {formErrors.username && <div className="error">{formErrors.username}</div>}
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                id='password'
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value.trim() })}
                                onKeyDown={(e) => handleKeyDown(e, 'password')}
                            />
                            {formErrors.password && <div className="error">{formErrors.password}</div>}
                        </div>
                        <div className="field">
                            <input type="submit" id="submit" value="Login" />
                        </div>
                    </form>
                    <div className="signup">
                        <span>Don't have an account? </span>
                        <Link to="/register"> Register</Link>
                    </div>
                </div>
            </div>
        )
    );
}

export default LoginPage;
