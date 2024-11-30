import React from 'react'
import "./PaymentInfo.css"

function PaymentInfo({ info }) {
    return (
        <div className="payment-info order-summary-section">
            <h2 className='mb-heading'>Payment Method</h2>
            <p>Method: {info.paymentMethod}</p>
        </div>
    )
}

export default PaymentInfo;