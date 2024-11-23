import React from "react";
import "./Testimonial.css"
import "./Testimonial"
import StarRating from "../StarRating/StarRating";

import testimonialImage from "../../assets/profile.jpg"


function Testimonial({ testimonial }) {
    return (
        <div className="testimonial-card">
            <StarRating rating={testimonial.rating} />
            <p>{testimonial.text}</p>
            <div className="profile">
                <img src={testimonialImage} alt={testimonial.name} />
                <div className="profile-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;