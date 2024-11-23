import axios from 'axios'
import { BEST_SALES_FAIL, BEST_SALES_REQUEST, BEST_SALES_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, TOP_RATED_FAIL, TOP_RATED_REQUEST, TOP_RATED_SUCCESS } from "../../constants/productConstants"


export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get("https://bookify.pythonanywhere.com/api/books/")
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.detail
                ? error.response.detail : error.message
        })
    }
}

export const bestSales = () => async (dispatch) => {

    try {
        dispatch({ type: BEST_SALES_REQUEST })

        const { data } = await axios.get("https://bookify.pythonanywhere.com/api/books/best-sales/")
        dispatch({
            type: BEST_SALES_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: BEST_SALES_FAIL,
            payload: error.response && error.response.detail
                ? error.response.detail : error.message
        })
    }
}

export const topRated = () => async (dispatch) => {

    try {
        dispatch({ type: TOP_RATED_REQUEST })

        const { data } = await axios.get("https://bookify.pythonanywhere.com/api/books/top/")
        dispatch({
            type: TOP_RATED_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: TOP_RATED_FAIL,
            payload: error.response && error.response.detail
                ? error.response.detail : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://bookify.pythonanywhere.com/api/books/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        console.log(error.response)
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.detail
                ? error.response.detail : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        // Set up the form data
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('author', product.author);
        formData.append('price', product.price);
        formData.append('image', product.image);  // Append the image file
        formData.append('count-in-stock', product["count-in-stock"]);
        formData.append('category', product.categories);
        formData.append('description', product.description);

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        // Post the form data
        const { data } = await axios.post(
            "https://bookify.pythonanywhere.com/api/books/create/",
            formData,  // Send FormData instead of JSON
            config
        );

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        // Set up the form data
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('author', product.author);
        formData.append('price', product.price);
        formData.append('image', product.image);  // Append the image file
        formData.append('count-in-stock', product["count-in-stock"]);
        formData.append('category', product.categories);
        formData.append('description', product.description);

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `https://bookify.pythonanywhere.com/api/books/update/${product.id}/`,
            formData,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `https://bookify.pythonanywhere.com/api/books/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}