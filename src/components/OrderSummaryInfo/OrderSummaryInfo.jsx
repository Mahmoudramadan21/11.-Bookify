import React from "react";
import "./OrderSummaryInfo.css"
import { useDispatch } from "react-redux";
import { createOrder } from "../../store/actions/orderActions";
import { useNavigate } from "react-router";

function OrderSummaryInfo({ order }) {


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const orderHandler = () => {
        dispatch(createOrder({
            paymentMethod: order.paymentMethod,
            taxPrice: order.taxPrice,
            shippingPrice: order.shippingPrice,
            totalPrice: order.totalPrice,
            shippingAddress: order.shippingAddress,
            orderItems: order.cartItems.map(item => (
                { book: item.id, price: item.price, qty: item.qty })
            )
        }))

        navigate("/")
    }


    return (
        <div className="order-summary-info order-summary-section">
            <h2 className="mb-heading">Order Summary</h2>
            <div className="summary-items">
                <div className="summary-item">
                    <span>Items:</span>
                    <span>${order.itemsPrice}</span>
                </div>
                <div className="summary-item">
                    <span>Shipping:</span>
                    <span>${order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span>Tax:</span>
                    <span>${order.taxPrice}</span>
                </div>
                <div className="summary-item last-child">
                    <span>Total:</span>
                    <span>${order.totalPrice}</span>
                </div>
                <div className="place-order-btn">
                    <button onClick={orderHandler} disabled={order.cartItems.length === 0}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryInfo;