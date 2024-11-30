import React, { useEffect, useState, useRef } from 'react';
import "./UserEditPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../store/actions/userActions';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

function UserEditPage() {

    const { loading, user, error } = useSelector(state => state.userDetails);
    const { userInfo } = useSelector(state => state.userLogin);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: id,
        name: "",
        email: "",
        "is-admin": ""
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        "is-admin": ""
    });

    const inputRefs = useRef({}); // Use useRef to persist across renders

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.length < 3) {
            errors.name = 'Name must be at least 3 characters long';
            isValid = false;
        }

        if (!formData.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(updateUser(formData));
            navigate('/dashboard/users/');
        }
    };

    const handleEnterPress = (e, fieldName) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const fieldNames = Object.keys(inputRefs.current);
            const currentIndex = fieldNames.indexOf(fieldName);

            if (currentIndex === fieldNames.length - 1) {
                handleSubmit(e); // Submit the form if it's the last field
            } else {
                inputRefs.current[fieldNames[currentIndex + 1]].focus(); // Move to the next field
            }
        }
    };

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user?.name) {
            setFormData({
                ...formData,
                name: user.name,
                email: user.email,
                "is-admin": user.isAdmin
            });
        }
    }, [user]);

    return (
        <div className="user-edit">
            <div className="form-container">
                <div className="container">
                    <h2 className="form-title mb-heading">User Edit</h2>

                    {loading ? <Loader /> : (
                        error ? <Error message={error} /> : (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-field">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value.trim() })}
                                        onKeyDown={(e) => handleEnterPress(e, 'name')}
                                        ref={ref => inputRefs.current['name'] = ref}
                                        className="form-input"
                                    />
                                    {formErrors.name && <div className="error">{formErrors.name}</div>}
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value.trim() })}
                                        onKeyDown={(e) => handleEnterPress(e, 'email')}
                                        ref={ref => inputRefs.current['email'] = ref}
                                        className="form-input"
                                    />
                                    {formErrors.email && <div className="error">{formErrors.email}</div>}
                                </div>
                                <div className="field">
                                    <input
                                        type="checkbox"
                                        name="isAdmin"
                                        id="isAdmin"
                                        checked={formData["is-admin"]}
                                        onChange={e => setFormData({ ...formData, "is-admin": e.target.checked })}
                                        onKeyDown={(e) => handleEnterPress(e, 'isAdmin')}
                                        ref={ref => inputRefs.current['isAdmin'] = ref}
                                        className='form-input'
                                    />
                                    <label htmlFor="isAdmin">Is Admin</label>
                                </div>
                                <div className="form-field">
                                    <input type="submit" id="submit" value="Update User" className="form-submit" />
                                </div>
                            </form>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
