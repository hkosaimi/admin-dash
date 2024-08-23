import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ element }) {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? element : <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;
