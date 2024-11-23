import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from "redux-thunk";
import sidebarReducer from './reducers/sidebarReducer'
import { bestSalesReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer, topRatedReducer } from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';
import { deliverOrder, payOrder } from './actions/orderActions';

const appReducer = combineReducers({
    sidebar: sidebarReducer,

    products: productListReducer,
    topProducts: topRatedReducer,
    bestProducts: bestSalesReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productEdit: productUpdateReducer,
    productDelete: productDeleteReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    usersList: userListReducer,
    userEdit: userUpdateReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,

    cart: cartReducer,

    orderCreate: orderCreateReducer,
    myOrders: orderListMyReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    deliverOrder: orderDeliverReducer,
    payOrder: orderPayReducer
})

const store = createStore(appReducer, applyMiddleware(thunk))

export default store;