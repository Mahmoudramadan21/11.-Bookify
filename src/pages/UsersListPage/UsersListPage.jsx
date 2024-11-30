import React, { useEffect } from 'react'
import "./UsersListPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../store/actions/userActions';
import Table from '../../components/Table/Table';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function UsersListPage() {

    const { userInfo } = useSelector(state => state.userLogin);

    const { loading, error, users } = useSelector(state => state.usersList)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } =
        useSelector(state => state.userDelete)
    const { loading: loadingEdit, success: successEdit, error: errorEdit } =
        useSelector(state => state.userEdit)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successEdit, successDelete])


    return (
        <div className="users-list">
            <div className="container">
                <h2 className="form-title mb-heading">Users</h2>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error message={error} />
                ) : (
                    <>
                        {/* Display errors from delete or edit */}
                        {errorDelete && <Error message={errorDelete} />}
                        {errorEdit && <Error message={errorEdit} />}

                        {!errorDelete && !errorEdit && (
                            <Table
                                ths={["id", "name", "email", "admin", "edit", "delete"]}
                                trs={users.map(user => ({
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    admin: (
                                        <FontAwesomeIcon icon={user.isAdmin ? faCheck : faX} />
                                    ),
                                    edit: (
                                        <Link to={`edit/${user.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>
                                    ),
                                    delete: (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => !loadingDelete && handleDelete(user.id)}
                                        />
                                    )
                                }))}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default UsersListPage;
