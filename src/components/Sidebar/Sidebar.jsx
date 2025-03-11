import React, { useCallback, useEffect } from 'react';
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

    const handleToggle = useCallback(() => {
        if (isOpen) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
    }, [isOpen, dispatch]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <aside className={`mobile-navbar ${isOpen ? "fade-in" : ""}`} tabIndex={isOpen ? 0 : -1}>
            <nav className="container" role="navigation">
                <div className="logo-menu-wrapper">
                    <div className="logo">
                        <img src={logo} alt="Bookstore Logo" />
                    </div>
                    <div className="close-menu">
                        <FontAwesomeIcon
                            className='close'
                            icon={faClose}
                            onClick={handleToggle}
                            aria-label="Close sidebar"
                        />
                    </div>
                </div>
                <ul>
                    <li>
                        <Link to="/" onClick={handleToggle} tabIndex={isOpen ? 0 : -1}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={handleToggle} tabIndex={isOpen ? 0 : -1}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/books" onClick={handleToggle} tabIndex={isOpen ? 0 : -1}>
                            Shop
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;