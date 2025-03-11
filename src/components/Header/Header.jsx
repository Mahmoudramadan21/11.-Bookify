import React from "react";
import "./Header.css";
import { faBars, faCartShopping, faRightToBracket, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, openSidebar } from "../../store/actions/sidebarAction";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import dashboard from "../../assets/dashboard.png"
import { logout } from "../../store/actions/userActions";
import { Link as ScrollLink } from "react-scroll";

function Header() {
    const { cartItems = [] } = useSelector(state => state.cart);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const isOpen = useSelector(state => state.sidebar.isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.userLogin);

    const handleToggle = () => {
        if (isOpen) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
    };

    return (
        <>
            <header>
                <div className="container">

                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Bookstore Logo" />
                        </Link>
                    </div>

                    <div className="search-bar">
                        <div className="search-bar-wrapper">
                            <input
                                type="text"
                                placeholder="Search a book here"
                                onChange={(e) => {
                                    if (e.target.value.trim().length > 0) {
                                        navigate(`books?s=${e.target.value.trim()}`)
                                    }
                                }
                                }
                            />
                            <button className="search-button">Search</button>
                        </div>
                    </div>

                    <nav>
                        <ul>
                            <li><a href="#"> Home</a></li>
                            <li><a href="#testimonials" >Reviews</a ></li>
                            <li><Link to="/books">Shop</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </nav>

                    <div className="profile-menu-wrapper">
                        {/* Cart */}
                        <Link className="cart" to="/cart" aria-label="Cart">
                            <FontAwesomeIcon icon={faCartShopping} />
                            {totalItems > 0 && <span>{totalItems}</span>}
                        </Link>

                        {/* Login */}
                        <Link to={userInfo ? "/profile" : "/login"} aria-label="Profile">
                            <FontAwesomeIcon className="user" icon={userInfo ? faUser : faRightToBracket} />
                        </Link>

                        {/* Dashboard */}
                        {userInfo?.isAdmin ?
                            <Link className="dashboard" to="/dashboard">
                                <img src={dashboard} alt="Dashboard" />
                            </Link>
                            : null
                        }

                        {/* Logout */}
                        {userInfo ?
                            <Link className="logout" onClick={() => dispatch(logout())}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </Link>
                            : null
                        }

                        {/* Menu for mobile */}
                        <FontAwesomeIcon
                            className="menu"
                            icon={faBars}
                            onClick={handleToggle}
                            aria-label="Menu"
                        />
                    </div>
                </div>
            </header>
            <Sidebar />
        </>
    );
}

export default Header;
