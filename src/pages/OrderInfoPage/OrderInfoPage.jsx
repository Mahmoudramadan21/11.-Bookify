import React, { useEffect } from 'react'
import "./OrderInfoPage.css"
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
import OrderInfo from '../../components/OrderInfo/OrderInfo'

function OrderInfoPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading: loadingOrderDetails, order, error: errorOrderDetails,
        userInfo
    } = useSelector(state => ({
        ...state.orderDetails,
        ...state.userLogin
    }));

    useEffect(() => {
        if (!order || order.id !== id) {
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, id, order?.id]);

    useEffect(() => {
        if (!userInfo?.username) {
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
                        {order && <OrderInfo order={order} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default OrderInfoPage;
