import React from 'react'
import "./CartPage.css"
import CartItem from '../../components/CartItem/CartItem';
import CartSummary from '../../components/CartSummary/CartSummary';
import { useSelector } from 'react-redux';

function CartPage() {

    const { cartItems } = useSelector(state => state.cart)

    return (
        <div className='cart'>
            <div className="container">
                <div className='items'>
                    <h2 className='title mb-heading'>Shopping Cart</h2>
                    {cartItems?.length > 0 ? (
                        cartItems.map(item => <CartItem key={item.id} item={item} />)
                    ) : (
                        <p style={{ textAlign: "center" }}>Your cart is empty</p>
                    )}
                </div>
                {cartItems?.length > 0 && <CartSummary />}
            </div>
        </div >
    )
}

export default CartPage;