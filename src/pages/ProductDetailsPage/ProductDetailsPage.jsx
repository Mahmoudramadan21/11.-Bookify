import React, { useEffect } from 'react'
import "./ProductDetailsPage.css"
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../../store/actions/productActions'
import { useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { addToCart } from '../../store/actions/cartActions'

function ProductDetailsPage() {

    const { loading, product, error } = useSelector(state => state.productDetails)

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    return (
        <div className="product-details">
            <div className="container">
                {loading ? <Loader /> : (
                    error ? <Error message={error} /> : (
                        <>
                            <div className="product-image">
                                <img src={`https://bookify.pythonanywhere.com/${product.image}`} alt="Product" />
                            </div>
                            <div className="product-info">
                                <h2 className='product-title'>{product.name}</h2>
                                <h4 className='product-author'>{product.author}</h4>
                                <h5 className='product-price'>${product.price}</h5>
                                <div className="add-to-cart">
                                    <button onClick={() => dispatch(addToCart(product.id, 1))}>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        Add to cart
                                    </button>
                                </div>
                                <p className='product-description'>{product.description}</p>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default ProductDetailsPage;