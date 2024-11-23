import React from "react";
import "./FavBook.css"
import favoritebook from "../../assets/favoritebook.jpg"
import { Link } from "react-router-dom";

function FavBook() {
    return (
        <section className="book-section">
            <div className="container">
                <div className="image">
                    <img src={favoritebook} alt="Book" />
                </div>
                <div className="info-section">
                    <h2 className="info-title">Find Your Favorite
                        <span className="highlight"> Book Here!</span>
                    </h2>
                    <p className="info-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ut pariatur quia.
                        Sint architecto tempore sapiente quibusdam et aliquid impedit ullam.
                    </p>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-number">800+</span>
                            <span className="stat-label">Book Listing</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">550+</span>
                            <span className="stat-label">Register User</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1200+</span>
                            <span className="stat-label">PDF Downloaded</span>
                        </div>
                    </div>
                    <Link to="/books">
                        <button className="explore-button">Explore Now</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FavBook;