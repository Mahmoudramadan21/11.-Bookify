import React from 'react'
import "./OrderSummaryDetails.css"
import { deliverOrder, payOrder } from '../../store/actions/orderActions';
import { useDispatch } from 'react-redux';

function OrderSummaryDetails({ order }) {
    const itemsPrice = order.orderItems.reduce((cur, acc) => cur + +acc.price, 0)

    const dispatch = useDispatch()

    return (
        <div className="order-summary-info order-summary-details order-summary-section">
            <h2 className='mb-heading'>Order Summary</h2>
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
                    <span>${Number(order.taxPrice)}</span>
                </div>
                <div className="summary-item last-child">
                    <span>Total:</span>
                    <span>${Number(order.totalPrice)}</span>
                </div>
                <div className="place-order-btn">
                    <button onClick={() => dispatch(deliverOrder(order))}>
                        Mark as Delivered
                    </button>
                </div>
                <div className="place-order-btn" onClick={() => dispatch(payOrder(order.id))}>
                    <button>
                        Mark as Paid
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryDetails;