import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import UserList from "./pages/users/UsersList.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AdminRoute from "./components/AdminRoute.jsx";
import Order from "./pages/orders/Order.jsx";
import ToastWrapper from "./ToastWrapper.jsx";
/* 
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin/orderlist",
        element: <Order />,
      },
      {
        path: "/admin/userlist",
        element: <UserList />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
    ],
  },
]); */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastWrapper>
          <App />
        </ToastWrapper>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
