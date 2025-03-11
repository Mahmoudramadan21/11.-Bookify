import React, { useEffect } from 'react'
import "./ProductsListPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts } from '../../store/actions/productActions';
import Table from "../../components/Table/Table"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

function ProductsListPage() {

    const { userInfo } = useSelector(state => state.userLogin)

    const { loading, products, error } = useSelector(state => state.products)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading: loadingEdit, success: successEdit, error: errorEdit } = useSelector(state => state.productEdit)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.productDelete)

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteProduct(id));
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (!products?.length && !loading) dispatch(listProducts())
    }, [dispatch, products, loading, successEdit, successDelete])


    return (
        <div className='products-list'>
            <div className="container">
                <div className="heading">
                    <h2 className="form-title mb-heading">Products</h2>
                    <button>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <Link to="products/create">
                            Create Product
                        </Link>
                    </button>
                </div>

                {loading ? <Loader /> : (
                    error ? <Error message={error} /> : (
                        <>
                            {/* Display errors from delete or edit */}
                            {errorDelete && <Error message={errorDelete} />}
                            {errorEdit && <Error message={errorEdit} />}

                            {(!errorDelete && !errorEdit) && (
                                <Table ths={["id", "name", "price", "categories", "edit", "delete"]}
                                    trs={products?.map(product => ({
                                        id: product.id,
                                        name: product.name,
                                        price: `$${product.price}`,
                                        categories: product.category,
                                        edit: <Link to={`products/edit/${product.id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>,
                                        delete: (
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => !loadingDelete && handleDelete(product.id)}
                                            />
                                        )
                                    }))}
                                />
                            )}
                        </>
                    )
                )
                }

            </div>
        </div>

    )
}

export default ProductsListPage;