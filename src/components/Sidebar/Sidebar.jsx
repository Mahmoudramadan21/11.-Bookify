import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSidebar, closeSidebar } from '../../store/actions/sidebarAction';
import './Sidebar.css';
import logo from '../../assets/logo.png';
import { faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function Sidebar() {
    const isOpen = useSelector(state => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const handleToggle = () => {
        if (isOpen) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
    };

    return (
        <header className={`mobile-navbar ${isOpen ? "fade-in" : ""}`}>
            <nav className="container">
                <div className={`logo-menu-wrapper`}>
                    <div className="logo">
                        <img src={logo} alt="Bookstore Logo" />
                    </div>
                    <div className="close-menu">
                        <FontAwesomeIcon className='close' icon={faClose} onClick={() => handleToggle()} />
                    </div>
                </div>
                <ul>
                    <li>
                        <Link to="/" onClick={handleToggle}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={handleToggle}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/books" onClick={handleToggle}>
                            Shop
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >)
}

export default Sidebar;