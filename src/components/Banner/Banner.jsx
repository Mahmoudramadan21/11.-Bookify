import React from "react";
import "./Banner.css"

import banner from "../../assets/awardbooks.png"
import { Link } from "react-router-dom";

function Banner(params) {
    return (
        <section className="banner">
            <div className="container">
                <div className="text-content">
                    <h2>2024 National Book Awards for Fiction Shortlist</h2>
                    <Link to="/books">
                        <button>Explore Now</button>
                    </Link>
                </div>
                <div className="image-content">
                    <img src={banner} alt="Books" />
                </div>
            </div>
        </section>
    )
}

export default Banner;