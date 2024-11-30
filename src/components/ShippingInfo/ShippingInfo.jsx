import React from 'react'
import "./ShippingInfo.css"

function ShippingInfo({ info }) {
    return (
        <div className="shipping-info order-summary-section">
            <h2 className='mb-heading'>Shipping</h2>
            <p>Shipping: {info.address}, {info.city} {info.postalCode}, {info.country}</p>
        </div>
    )
}

export default ShippingInfo;