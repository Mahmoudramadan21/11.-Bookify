import React from 'react'
import "./OrderItems.css"

function OrderItems({ items }) {
    return (
        <div className="order-items order-summary-section">
            <h2 className='mb-heading'>Order Items</h2>
            {items.map((item, index) => (
                <div className="order-item" key={item.id}>
                    <div className="item-image">
                        <img src={`https://bookify.pythonanywhere.com/${item.image}`} alt="" />
                    </div>
                    <div className="item-name"><p>{item.name}</p></div>
                    <div className="item-total-price">
                        <span>{item.qty} x </span>
                        <span>${item.price} = </span>
                        <span>${item.qty * item.price}</span>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default OrderItems;