import React, { useEffect } from "react";
import "./BooksPage.css";
import Product from "../../components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../store/actions/productActions";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useLocation } from "react-router";

function BooksPage() {
    const { loading, products, error } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const { search } = useLocation();
    const searchQuery = new URLSearchParams(search).get('s'); // Parse search parameter

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!products?.length && !loading) dispatch(listProducts())
    }, [dispatch, products, loading]); // Add dispatch to the dependency array

    return (
        <section className="books-page">
            <div className="container">
                <h2>All Books Are Available Here</h2>
                <div className="books">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Error message={error} />
                    ) : (
                        products
                            ?.filter(product => {
                                return product.name.toLowerCase().includes(searchQuery ? searchQuery.toLowerCase() : ""); // Match by name
                            })
                            .map(product => <Product key={product.id} product={product} />) // Render filtered products
                    )}
                </div>
            </div>
        </section>
    );
}

export default BooksPage;
