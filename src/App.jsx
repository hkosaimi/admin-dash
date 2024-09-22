import Order from "./pages/orders/Order";
import UsersList from "./pages/users/UsersList";
import OrderDetails from "./pages/orders/OrderDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import UserDetails from "./pages/users/UserDetails";
import Login from "./pages/auth/Login";
import AdminRoute from "./components/AdminRoute";
import Delivery from "./pages/delivery/Delivery";
import ProductList from "./pages/products/ProductList";
import Discounts from "./pages/discounts/Discounts";
import Categories from "./pages/categories/Categories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/settings/Settings";
import ProductDetails from "./pages/products/ProductDetails";
import ProductCreate from "./pages/products/ProductCreate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute element={<Order />} />} />
        <Route path="/admin/orders/:orderId" element={<AdminRoute element={<OrderDetails />} />} />
        <Route path="/admin/userlist/page" element={<AdminRoute element={<UsersList />} />} />
        <Route
          path="/admin/userlist/page/:pageNumber"
          element={<AdminRoute element={<UsersList />} />}
        />
        <Route path="/admin/userlist/:userID" element={<AdminRoute element={<UserDetails />} />} />
        <Route path="/admin/delivery" element={<AdminRoute element={<Delivery />} />} />
        <Route path="/admin/productlist" element={<AdminRoute element={<ProductList />} />} />
        <Route
          path="/admin/productlist/:id"
          element={<AdminRoute element={<ProductDetails />} />}
        />
        <Route
          path="/admin/productlist/product-create"
          element={<AdminRoute element={<ProductCreate />} />}
        />
        <Route path="/admin/discounts" element={<AdminRoute element={<Discounts />} />} />
        <Route path="/admin/settings" element={<AdminRoute element={<Settings />} />} />
        <Route path="/admin/categories" element={<AdminRoute element={<Categories />} />} />
      </Routes>
    </>
  );
}

export default App;
