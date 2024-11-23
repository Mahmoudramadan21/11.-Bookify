import React from "react";
import "./StarRating.css"

function StarRating({ rating }) {
    return (
        <div className="stars">
            {Array(rating).fill().map((_, i) => (
                <span key={i}>⭐</span>
            ))}
        </div>
    )
}

export default StarRating;