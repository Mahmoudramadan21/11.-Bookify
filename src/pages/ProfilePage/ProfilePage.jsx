import React, { useEffect } from 'react';
import "./ProfilePage.css";
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../../store/actions/orderActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import UserProfile from '../../components/UserProfile/UserProdile';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, orders = [], error } = useSelector(state => state.myOrders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            dispatch(listMyOrders());
        }
    }, [userInfo, navigate, dispatch]);

    return (
        <div className="profile">
            <div className="container">
                <UserProfile />
                <div className="my-orders">
                    <h2 className="form-title mb-headinge">My Orders</h2>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Error message={error} />
                    ) : orders.length > 0 ? (
                        <Table
                            ths={["id", "date", "total", "paid", "delivered", "details"]}
                            trs={orders.map(order => ({
                                id: order.id,
                                date: order.createdAt.split("T")[0],
                                total: `$${(order.totalPrice ? Number(order.totalPrice).toFixed(2) : "0.00")}`,
                                paid: <FontAwesomeIcon icon={order.isPaid ? faCheck : faXmark} />,
                                delivered: <FontAwesomeIcon icon={order.isDelivered ? faCheck : faXmark} />,
                                details: <Link to={`order/${order.id}`} > Details</Link>

                            }))}
                        />
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
