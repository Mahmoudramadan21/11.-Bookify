import React, { useEffect } from 'react'
import "./OrdersListPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/actions/orderActions';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table/Table';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

function OrdersListPage() {

    const { loading, error, orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listOrders())
    }, [])

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    return (
        <div className="orders-list">
            <div className="container">
                <h2 className="form-title mb-heading">Orders</h2>

                {loading ? <Loader /> : (
                    error ? <Error message={error} /> :
                        (
                            <Table ths={["id", "user", "date", "total", "paid", "delivered", "details"]}
                                trs={orders?.map(order => ({
                                    id: order.id,
                                    user: order.user.name,
                                    date: order.createdAt.split("T")[0],
                                    total: `$${order.totalPrice}`,
                                    paid: <FontAwesomeIcon icon={order.isPaid ? faCheck : faX} />,
                                    delivered: <FontAwesomeIcon icon={order.isDelivered ? faCheck : faX} />,
                                    details: <Link to={`${order.id}`} > Details</Link>
                                }))}
                            />
                        )
                )
                }

            </div>
        </div>
    )
}

export default OrdersListPage;