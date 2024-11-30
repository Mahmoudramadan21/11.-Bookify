import React from "react";
import "./OrderInfo.css"


function OrderInfo({ order }) {
    const itemsPrice = order.orderItems.reduce((cur, acc) => cur + +acc.price, 0)

    return (
        <div className="order-summary-info order-summary-section" style={{ padding: "30px 0px" }}>
            <h2 className="mb-heading">Order Summary</h2>
            <div className="summary-items">
                <div className="summary-item">
                    <span>Items:</span>
                    <span>${itemsPrice}</span>
                </div>
                <div className="summary-item">
                    <span>Shipping:</span>
                    <span>${Number(order.shippingPrice).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span>Tax:</span>
                    <span>${order.taxPrice}</span>
                </div>
                <div className="summary-item last-child">
                    <span>Total:</span>
                    <span>${order.totalPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderInfo;