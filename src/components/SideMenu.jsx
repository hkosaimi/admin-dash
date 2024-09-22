import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  ShoppingBasket,
  Box,
  Boxes,
  Users,
  TicketPercent,
  LogOut,
  Truck,
  Settings,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Divider from "./Divider";
import { useLogoutMutation } from "../redux/queries/userApi";
import { toast } from "react-toastify";

function SideMenu({ storeName }) {
  const [logoutApiCall] = useLogoutMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await logoutApiCall().unwrap();
    dispatch(logout());
    toast.success(res.message);
    navigate("/admin/login");
  };
  return (
    <div className="flex  flex-col w-[30%] text-sm lg:text-lg lg:w-[15%]  min-h-screen text-black px-[0.5rem] lg:px-[2rem] py-[2rem] border-r-[2px]">
      <div>
        <div className="rounded-[50%] mb-3 select-none border-2  border-gray-300 size-12 flex justify-center items-center ">
          <div className="rounded-[50%] bg-gradient-to-r shadow-md from-gray-500 to-gray-700 text-white size-10 flex justify-center items-center">
            {userInfo?.name.charAt(0).toUpperCase()}
            {userInfo?.name.charAt(userInfo?.name.length - 1).toUpperCase()}
          </div>
        </div>
        <h1 className="font-bold mb-7">{storeName}</h1>
      </div>
      <Divider />

      <div className="flex  flex-col justify-between h-full">
        <div className="flex flex-col gap-3 ">
          <Link
            to="/admin"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname === "/admin" && "bg-white shadow"
            )}>
            <ShoppingBasket strokeWidth={1} />
            <p>Orders</p>
          </Link>
          <Link
            to="/admin/productlist"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname.startsWith("/admin/productlist") && "bg-white shadow"
            )}>
            <Box strokeWidth={1} />
            <p>Products</p>
          </Link>
          <Link
            to="/admin/categories"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname === "/admin/categories" && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            )}>
            <Boxes strokeWidth={1} />
            <p>Categories</p>
          </Link>
          <Link
            to="/admin/userlist/page/1"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname.startsWith("/admin/userlist") && "bg-white shadow"
            )}>
            <Users strokeWidth={1} />
            <p>Customers</p>
          </Link>
          <Link
            to="/admin/discounts"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname.startsWith("/admin/discounts") && "bg-white shadow"
            )}>
            <TicketPercent strokeWidth={1} />
            <p>Discounts</p>
          </Link>
          <Link
            to="/admin/delivery"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname === "/admin/delivery" && "bg-white shadow"
            )}>
            <Truck strokeWidth={1} />
            <p>Delivery</p>
          </Link>
          <Link
            to="/admin/settings"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow transition-all duration-300",
              pathname === "/admin/settings" && "bg-white shadow"
            )}>
            <Settings strokeWidth={1} />
            <p>Settings</p>
          </Link>
        </div>
        <div className="">
          <Divider />
          <button
            onClick={handleLogout}
            className="  items-center transition-all duration-100  w-full flex gap-3 bg-gradient-to-t  hover:from-rose-500 hover:to-rose-400 hover:text-white text-black px-3 py-2 rounded-lg hover:shadow-md">
            <LogOut strokeWidth={1} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
