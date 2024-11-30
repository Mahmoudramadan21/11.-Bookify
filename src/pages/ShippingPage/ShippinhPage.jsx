import React, { useEffect, useState } from 'react'
import "./Form.css"
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../store/actions/cartActions'
import { useNavigate } from 'react-router'

function ShippingPage() {
    const { userInfo } = useSelector(state => state.userLogin)
    const { cartItems } = useSelector(state => state.cart)

    const { shippingAddress } = useSelector(state => state.cart)

    const [shipping, setShipping] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo)
            navigate("/login")

        if (cartItems.length == 0)
            navigate("/cart")

        if (shippingAddress) {
            setShipping({
                address: shippingAddress.address || "",
                city: shippingAddress.city || "",
                postalCode: shippingAddress.postalCode || "",
                country: shippingAddress.country || ""
            })
        }
    }, [shippingAddress, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(shipping))
        navigate("/payment")
    }

    return (
        <div className="shipping-page form-container">
            <div className="container">
                <h2 className="form-title mb-heading">Shipping</h2>
                <form onSubmit={submitHandler} className="form">
                    <div className="form-field">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={shipping.address}
                            onChange={(e) => setShipping({ ...shipping, address: e.target.value.trim() })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            id="city"
                            value={shipping.city}
                            onChange={(e) => setShipping({ ...shipping, city: e.target.value.trim() })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="postal-code" className="form-label">Postal Code</label>
                        <input
                            type="text"
                            id="postal-code"
                            value={shipping.postalCode}
                            onChange={(e) => setShipping({ ...shipping, "postalCode": e.target.value.trim() })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            id="country"
                            value={shipping.country}
                            onChange={(e) => setShipping({ ...shipping, country: e.target.value.trim() })}
                            className="form-input"
                        />
                    </div>
                    <div className="form-field">
                        <input type="submit" id="submit" value="Continue" className="form-submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingPage;
