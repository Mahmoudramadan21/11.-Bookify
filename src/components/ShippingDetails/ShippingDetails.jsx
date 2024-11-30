import React from 'react';
import "./ShippingDetails.css";

function ShippingDetails({ details }) {
    const { user, shippingAddress, isDelivered, deliveredAt } = details || {};
    return (
        <div className="shipping-details order-summary-section">
            <h2 className='mb-heading'>Shipping</h2>
            <p>Name: {user?.name || "N/A"}</p>
            <p>Email: {user?.email || "N/A"}</p>
            <p>
                Shipping: {shippingAddress ? `${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}` : "N/A"}
            </p>
            <div className="status" style={isDelivered ? { backgroundColor: "#ddf5da" } : null}>
                <p>{isDelivered ? `Delivered on ${deliveredAt}` : "Not Delivered"}</p>
            </div>
        </div>
    );
}


export default ShippingDetails;
