import Layout from "../../Layout";
import { Link } from "react-router-dom";
import { setUserInfo } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
function Order() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);
  let orderID = 1;
  return (
    <Layout>
      <div className="px-4 py-6 lg:py-3 lg:mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">All orders:</h1>
          <button onClick={() => toast.success("Hey")}>hhh</button>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>

        <div className="lg:flex hidden lg:mt-[50px] flex-col  lg:flex-row justify-around gap-4 px-3  w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>id</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Date</p>
          <p>Status</p>
          <p>Total</p>
        </div>
        <div className="flex flex-col">
          <div className="w-full flex lg:w-[1000px] mb-5">
            <div className="lg:hidden p-3 flex flex-col justify-around gap-4">
              <p>id:</p>
              <p>Name:</p>
              <p>Email:</p>
              <p>Phone:</p>
              <p>Date:</p>
              <p>Status:</p>
              <p>Total:</p>
            </div>
            <Link
              to={`/${orderID}`}
              className="flex flex-col lg:flex-row w-full justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden hover:bg-gray-100">
              <p>#1</p>
              <p> Jane Doe</p>
              <p>janedoe@example.com</p>
              <p>(123) 456-7890</p>
              <p>June 20, 2024</p>
              <div className="flex items-center gap-4 w-[200px]">
                <div className="rounded-[50%] w-[10px] h-[10px] bg-teal-500"></div>
                <p>Delivered</p>
              </div>
              <p>KD 12.00</p>
            </Link>
          </div>
          <div className="w-full lg:w-[1000px]  ">
            <Link
              href="/"
              className="flex w-full flex-col lg:flex-row justify-around hover:bg-gray-100 gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden">
              <p>#2</p>
              <p> Jane Doe</p>
              <p>janedoe@example.com</p>
              <p>(123) 456-7890</p>
              <p>June 20, 2024</p>
              <div className="flex items-center gap-4 w-[200px]">
                <div className="rounded-[50%] w-[10px] h-[10px] bg-orange-300"></div>
                <p>Process</p>
              </div>
              <p>KD 15.00</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Order;
