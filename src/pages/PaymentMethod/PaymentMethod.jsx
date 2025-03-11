import React, { useEffect, useState } from 'react'
import "./PaymentMethod.css"
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../store/actions/cartActions'
import { useNavigate } from 'react-router'

function PaymentMethod() {
    const { cartItems } = useSelector(state => state.cart)

    const [paymentMethod, setPaymentMethod] = useState("")
    const [error, setError] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)

        if (cartItems.length == 0)
            navigate("/cart")
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        if (!paymentMethod) {
            setError('Please select a payment method');
            return;
        }

        // Dispatch the selected payment method to Redux
        dispatch(savePaymentMethod({ paymentMethod }))
        navigate("/ordersummary")
    }

    return (
        <div className="payment">
            <div className="container">
                <h2 className='mb-heading'>Payment Method</h2>
                <form className='payment-form' onSubmit={submitHandler}>
                    <div className="field">
                        <input
                            type="radio"
                            name="payment-method"
                            id="paypal"
                            className='payment-option'
                            value="PayPal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className="field">
                        <input
                            type="radio"
                            name="payment-method"
                            id="cash"
                            className='payment-option'
                            value="Cash"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="cash">Cash</label>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="field">
                        <input type="submit" id="submit" value="Continue" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaymentMethod;
