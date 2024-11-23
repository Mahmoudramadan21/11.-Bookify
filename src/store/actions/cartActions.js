import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`https://bookify.pythonanywhere.com/api/books/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("There was an error adding the item to the cart:", error);
    }
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
