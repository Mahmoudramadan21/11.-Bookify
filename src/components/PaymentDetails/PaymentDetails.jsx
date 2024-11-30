import React from 'react';
import "./PaymentDetails.css";

function PaymentDetails({ details }) {
    const { paymentMethod, isPaid, paidAt } = details || {};
    return (
        <div className="payment-details order-summary-section">
            <h2 className='mb-heading'>Payment Method</h2>
            <p>Method: {paymentMethod}</p>
            <div className="status" style={isPaid ? { backgroundColor: "#ddf5da" } : null}>
                <p>
                    {isPaid ? `Paid on ${paidAt}` : "Not Paid"}
                </p>
            </div>
        </div>
    );
}


export default PaymentDetails;
