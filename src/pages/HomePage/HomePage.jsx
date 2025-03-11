import React, { useEffect } from "react";
import "./HomePage.css"
import Hero from "../../components/Hero/Hero";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import FavBook from "../../components/FavBook/FavBook";
import Banner from "../../components/Banner/Banner";
import Testimonials from "../../components/Testimonials/Testimonials";
import { useDispatch, useSelector } from "react-redux";
import { bestSales, listProducts, topRated } from "../../store/actions/productActions";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

function HomePage() {

    const { loading, products, error } = useSelector(state => state.products)

    const { loading: loadingBestSale, bestProducts, error: errorBestSales }
        = useSelector(state => state.bestProducts)

    const { loading: loadingTopRated, topProducts, error: errorTopRated }
        = useSelector(state => state.topProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!bestProducts?.length && !loadingBestSale) dispatch(bestSales())
        if (!topProducts?.length && !loadingTopRated) dispatch(topRated())
        if (!products?.length && !loading) dispatch(listProducts())
    }, [dispatch, bestProducts, topProducts, products, loadingBestSale, loadingTopRated, loading]);



    return (
        <>
            <Hero />
            <section className="best-seller products-slider">
                <h2>Best Seller Books</h2>
                {loadingBestSale ? <Loader /> : (errorBestSales ? <Error message={errorBestSales} /> : <ProductSlider products={bestProducts} />)}
            </section>
            <FavBook />
            <Banner />
            <section className="products-slider">
                <h2>Top Books</h2>
                {loadingTopRated ? <Loader /> : (errorTopRated ? <Error message={errorTopRated} /> : <ProductSlider products={topProducts} />)}
            </section>
            <section className="other-books products-slider">
                <h2>Other Books</h2>
                {loading ? <Loader /> : (error ? <Error message={error} /> : <ProductSlider products={products} />)}
            </section>
            <Testimonials />
        </>
    )
}

export default HomePage;