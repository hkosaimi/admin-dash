import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { ShoppingBasket, Box, Boxes, Users, TicketPercent, LogOut, Truck } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Divider from "./Divider";

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };
  return (
    <div className="flex flex-col w-[32%] lg:w-[15%]  min-h-screen text-black px-[0.5rem] lg:px-[2rem] py-[2rem] border-r-[2px]">
      <div>
        <div className="rounded-[50%] mb-3 select-none border-2  border-gray-300 w-[38px] h-[38px] flex justify-center items-center ">
          <div className="rounded-[50%] bg-gradient-to-r shadow-md from-gray-500 to-gray-700 text-white w-[30px] h-[30px] flex justify-center items-center">
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <h1 className="font-bold mb-7">Store name</h1>
      </div>
      <Divider />

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <Link
            to="/admin"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname === "/admin" && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            )}>
            <ShoppingBasket strokeWidth={1} />
            <p>Orders</p>
          </Link>
          <Link
            to="/admin/productlist"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname === "/admin/productlist" && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
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
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname.startsWith("/admin/userlist") && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            )}>
            <Users strokeWidth={1} />
            <p>Customers</p>
          </Link>
          <Link
            to="/admin/discounts"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname.startsWith("/admin/discounts") && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            )}>
            <TicketPercent strokeWidth={1} />
            <p>Discounts</p>
          </Link>
          <Link
            to="/admin/delivery"
            className={clsx(
              "flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]",
              pathname === "/admin/delivery" && "bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            )}>
            <Truck strokeWidth={1} />
            <p>Delivery</p>
          </Link>
        </div>
        <div className="">
          <Divider />
          <button
            onClick={handleLogout}
            className="text-[#F43F5E] w-full flex gap-3 hover:bg-white px-3 py-2 rounded-lg hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]">
            <LogOut strokeWidth={1} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
