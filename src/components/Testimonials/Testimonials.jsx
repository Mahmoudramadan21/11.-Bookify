import React from "react";
import "./Testimonials.css"
import Testimonial from "../Testimonial/Testimonial";

const testimonials = [
    {
        id: 1,
        rating: 5,
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptatibus libero eaque illo voluptate ducimus commodi.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: "https://via.placeholder.com/50" // Add the URL to your images here
    },
    {
        id: 2,
        rating: 5,
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptatibus libero eaque illo voluptate ducimus commodi.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: "https://via.placeholder.com/50"
    },
    {
        id: 3,
        rating: 5,
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptatibus libero eaque illo voluptate ducimus commodi.",
        name: "Mark Ping",
        position: "CEO, ABC Company",
        image: "https://via.placeholder.com/50"
    }
];

function Testimonials() {
    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <h2>Our Customers</h2>
                <div className="testimonial-cards">
                    {testimonials.map(testimonial => (
                        <Testimonial key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Testimonials;