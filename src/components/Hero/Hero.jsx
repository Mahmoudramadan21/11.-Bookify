import React from "react";
import "./Hero.css"
import booksImage from "../../assets/6920933.jpg"

function Hero() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-text">
                    <h1 className="hero-title">Buy and sell your books
                        <span className="highlight"> for the best prices</span>
                    </h1>
                    <p className="hero-subtitle">Find and read more books you'll love, and keep track of the books you want to read. Be
                        part of the world's largest community of book lovers on Goodreads.
                    </p>
                </div>
                <div className="hero-image">
                    <img src={booksImage} alt="Young Mungo by Douglas Stuart" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
