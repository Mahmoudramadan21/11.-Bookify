import React, { useEffect } from 'react'
import "./OrderDetailsPage.css"
import OrderItems from "../../components/OrderItems/OrderItems"
import Loader from "../../components/Loader/Loader"
import Error from "../../components/Error/Error"
import ShippingDetails from '../../components/ShippingDetails/ShippingDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../store/actions/orderActions';
import PaymentDetails from '../../components/PaymentDetails/PaymentDetails';
import { useNavigate, useParams } from 'react-router';
import OrderSummaryDetails from '../../components/OrderSummaryDetails/OrderSummaryDetails'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants'

function OrderDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading: loadingOrderDetails, order, error: errorOrderDetails } =
        useSelector(state => state.orderDetails)
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } =
        useSelector(state => state.deliverOrder)
    const { loading: loadingPay, error: errorPay, success: successPay, } =
        useSelector(state => state.payOrder)

    const { userInfo } =
        useSelector(state => state.userLogin)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!order || order.id !== id || successDeliver || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, id, order?.id, successDeliver, successPay]);

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    return (
        <div className="order-details">
            <div className="container">
                {loadingOrderDetails ? (
                    <Loader />
                ) : errorOrderDetails ? (
                    <Error message={errorOrderDetails} />
                ) : (
                    <>
                        <div className="shipping-payment-order-wrapper">
                            <h2 className='form-title mb-heading'>Order:</h2>
                            {order && <ShippingDetails details={order} />}
                            {order && <PaymentDetails details={order} />}
                            {order?.orderItems && <OrderItems items={order.orderItems} />}
                        </div>
                        {order && <OrderSummaryDetails order={order} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default OrderDetailsPage;
