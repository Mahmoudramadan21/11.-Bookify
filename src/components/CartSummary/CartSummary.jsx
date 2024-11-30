import React from 'react'
import "./CartSummary.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function CartSummary() {

    const { cartItems } = useSelector(state => state.cart)
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const totalPrice = cartItems.reduce((x, y) => x + y.price * y.qty, 0).toFixed(2)

    return (
        <div className="cart-summary">
            <div className="cart-items">
                <h2 className="cart-title mb-heading">SUBTOTAL ({totalItems}) ITEMS</h2>
                <p className="cart-amount">${totalPrice}</p>
            </div>
            <div className="checkout-button">
                <Link to={`${cartItems.length > 0 ? "/shipping" : ""}`}>
                    <button>PROCEED TO CHECKOUT</button>
                </Link>
            </div>
        </div >
    )
}

export default CartSummary;