import React, { useEffect } from 'react'
import "./OrderSummaryPage.css"
import ShippingInfo from '../../components/ShippingInfo/ShippingInfo';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import OrderSummaryInfo from '../../components/OrderSummaryInfo/OrderSummaryInfo';
import OrderItems from '../../components/OrderItems/OrderItems';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function OrderSummaryPage() {
    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const itemsPrice = (cartItems.reduce((cur, acc) => cur + Number(acc.price), 0)).toFixed(2)
    const taxPrice = (itemsPrice * 0.14).toFixed(2)
    const totalPrice = (+itemsPrice + +taxPrice).toFixed(2)

    useEffect(() => {
        if (cartItems.length == 0)
            navigate("/cart")
    }, [])

    return (
        <div className="order-summary">
            <div className="container">
                <div className="shipping-payment-order-wrapper">
                    <ShippingInfo info={shippingAddress} />
                    <PaymentInfo info={paymentMethod} />
                    <OrderItems items={cartItems} />
                </div>
                <OrderSummaryInfo order={{
                    itemsPrice,
                    shippingPrice: 0,
                    taxPrice,
                    totalPrice,
                    shippingAddress,
                    "paymentMethod": paymentMethod.paymentMethod,
                    cartItems
                }} />
            </div>
        </div>
    )
}

export default OrderSummaryPage;