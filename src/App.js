import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login Page/LoginPage';
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import CartPage from "./pages/CartPage/CartPage";
import ShippingPage from "./pages/ShippingPage/ShippinhPage";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import OrderSummaryPage from "./pages/OrderSummaryPage/OrderSummaryPage";
import Profile from "./pages/ProfilePage/ProfilePage";
import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";
import ProductCreatePage from "./pages/ProductCreatePage/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage/ProductEditPage";
import OrdersListPage from "./pages/OrdersListPage/OrdersListPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import UsersListPage from "./pages/UsersListPage/UsersListPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import OrderInfoPage from "./pages/OrderInfoPage/OrderInfoPage";
import SideMenu from "./components/SideMenu/SideMenu";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetailsPage";
import AboutPage from "./pages/AboutPage/AboutPage";

// Component to wrap all routes and check location
function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/ordersummary" element={<OrderSummaryPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/order/:id" element={<OrderInfoPage />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<SideMenu />}>
          <Route path="" element={<ProductsListPage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          <Route path="orders" element={<OrdersListPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="users" element={<UsersListPage />} />
          <Route path="users/edit/:id" element={<UserEditPage />} />
        </Route>
      </Routes>
      {/* Conditionally render Footer */}
      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
