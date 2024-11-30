import React, { useRef } from "react";
import "./ProductSlider.css";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

function ProductSlider({ products }) {
    const scrollRef = useRef(null);

    function scrollLeft() {
        scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }

    function scrollRight() {
        scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }

    return (
        <div className="products-slider">
            <div className="container">
                <FontAwesomeIcon className="arrow-left" icon={faArrowCircleLeft} onClick={scrollLeft} />
                <div className="products-slider-container" ref={scrollRef}>
                    {products?.map(product => <Product product={product} key={product.id} />)}
                </div>
                <FontAwesomeIcon className="arrow-right" icon={faArrowCircleRight} onClick={scrollRight} />
            </div>
        </div>
    );
}

export default ProductSlider;
