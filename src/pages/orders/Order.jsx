import Layout from "../../Layout";
import { Link } from "react-router-dom";
import { setUserInfo } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Badge from "../../components/Badge";
import { useGetOrdersQuery } from "../../redux/queries/orderApi";
import { Layers } from "lucide-react";

function Order() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders } = useGetOrdersQuery();
  console.log(orders);

  return (
    <Layout>
      <div className="px-0 py-6 lg:py-3 lg:mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <div className="flex gap-2 lg:gap-5 text-sm lg:text-xl items-center">
            <h1 className="text-[20px] font-bold ">All orders: </h1>
            <Badge icon={false}>
              <Layers />
              {orders?.length > 0 ? orders?.length : "0"} orders
            </Badge>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        {orders?.length > 0 ? (
          <>
            <div className="lg:flex hidden lg:mt-[50px] flex-col  lg:flex-row justify-around gap-4 px-3  w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
              <p>id:</p>
              <p>Name:</p>
              <p>Payment:</p>
              <p>Items:</p>
              <p>Date:</p>
              <p>Status:</p>
              <p>Total:</p>
            </div>
            <div className="flex flex-col">
              {orders?.map((order) => (
                <div
                  key={order?._id}
                  className="w-full text-[14px] md:text-[18px] flex lg:w-[1000px] mb-5">
                  <div className="lg:hidden p-3 flex flex-col justify-around gap-2">
                    <p>id:</p>
                    <p>Items:</p>
                    <p>Email:</p>
                    <p>Phone:</p>
                    <p>Date:</p>
                    <p>Status:</p>
                    <p>Total:</p>
                  </div>

                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="flex [&>p]:truncate  flex-col lg:flex-row w-full justify-around gap-2 bg-white px-3 py-3 rounded-lg shadow  hover:shadow-md lg:[&>p]:w-[200px] [&>p]:overflow-hidden hover:bg-gray-100 transition-all duration-300">
                    <p>#{order?._id.substring(0, 7)}...</p>
                    <p> {order?.user ? order.user.name : <Badge>Deleted user</Badge>}</p>
                    <p>{order?.paymentMethod}</p>
                    <p>{order?.orderItems.length}</p>
                    <p>{order?.createdAt.substring(0, 10)}</p>
                    {/* <p> */}
                    {order?.isDelivered ? (
                      <Badge variant="success">Delivered</Badge>
                    ) : (
                      <Badge variant="pending">Processing</Badge>
                    )}
                    {/* </p> */}
                    {/* <p className="flex gap-2 items-center text-sm text-orange-600">
                      <div className="bg-orange-600 rounded-full size-2"></div>
                      <div>Processing</div>
                    </p> */}
                    {/*  <p className="flex gap-2 bg-teal-50  items-center text-sm text-teal-600">
                      <div className="bg-teal-600 rounded-full size-2"></div>
                      <div>Delivered</div>
                    </p> */}
                    <p>{order?.totalPrice.toFixed(3)} KD</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-[1000px]">
            <Message dismiss={false}>There are no orders</Message>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Order;
