import React from "react";
import "./Footer.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faX } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="sections">
                    <div className="footer-section company">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Brand Center</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer-section help-center">
                        <h4>Help Center</h4>
                        <ul>
                            <li><a href="#">Discord Server</a></li>
                            <li><a href="#">X</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section legal">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Licensing</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div className="footer-section download">
                        <h4>Download</h4>
                        <ul>
                            <li><a href="#">iOS</a></li>
                            <li><a href="#">Android</a></li>
                            <li><a href="#">Windows</a></li>
                            <li><a href="#">MacOS</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Online Books</p>
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>

                    </div>
                </div>
            </div>
        </footer >

    )
}

export default Footer;