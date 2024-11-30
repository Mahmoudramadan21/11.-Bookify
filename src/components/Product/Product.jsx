import React from "react";
import "./Product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartPlus, faCartShopping, faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/cartActions";
import { Link } from "react-router-dom";

function Product({ product }) {
    const dispatch = useDispatch()

    return (
        <div className="product-card" id={product.id}>
            <div className="product-image">
                <img src={`https://bookify.pythonanywhere.com/${product.image}`} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <div className="title-author-wrapper">
                    <Link to={`/books/${product.id}`}>
                        <h3 className="product-title">{product.name}</h3>
                    </Link >
                    <p className="product-author">{product.author}</p>
                </div>
                <p className="product-price">${product.price}</p>
            </div>
            <button className="cart-icon" onClick={() => dispatch(addToCart(product.id, 1))}>
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default Product;