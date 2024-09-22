import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import clsx from "clsx";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import Loader from "../../components/Loader";
import {
  useGetAddressQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/queries/userApi";
import Message from "../../components/Message";
import Badge from "../../components/Badge";
import { useGetUserOrdersQuery } from "../../redux/queries/orderApi";

function UserDetails() {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const { data: userOrders } = useGetUserOrdersQuery(userID);
  const { data: user, isLoading: loadingUser, error, refetch } = useGetUserDetailsQuery(userID);
  const [updateUser] = useUpdateUserMutation();
  console.log(user);
  const { data: userAddress, isLoading: loadingAddress } = useGetAddressQuery(userID);
  const [deleteUser] = useDeleteUserMutation();

  const handleConfirmation = () => {
    setPopUp(!popUp);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userID).unwrap();
      refetch();
      navigate("/admin/userlist/page/1");
      toast.success("User deleted successfully");
      setPopUp(!popUp);
    } catch (error) {
      toast.error(error?.data?.message || "error occurred");
    }
  };

  const handleMakeAdmin = async () => {
    await updateUser({ userId: userID, isAdmin: true }).unwrap();
    refetch();
    toast.success("User updated successfully");
  };
  const handleRemoveAdmin = async () => {
    await updateUser({ userId: userID, isAdmin: false }).unwrap();
    refetch();
    toast.success("User updated successfully");
  };
  return (
    <Layout>
      <div
        className={clsx(
          "px-4 py-3 flex gap-10  mt-[50px] ml-0 lg:ml-[50px] ",
          popUp && "opacity-20"
        )}>
        <div className="">
          <div className="flex justify-between ">
            <h1 className="text-[20px] font-bold">Customer's information:</h1>
            <div className="flex gap-5">
              <button
                onClick={handleConfirmation}
                className=" select-none   bg-gradient-to-t  from-rose-500 to-rose-400 text-white px-3 py-2 rounded-lg font-bold shadow-md">
                Delete
              </button>
              {user?.isAdmin ? (
                <button
                  onClick={handleRemoveAdmin}
                  className=" select-none    transition-all duration-300   bg-gradient-to-t  from-teal-500 to-teal-400 text-white px-3 py-2 rounded-lg font-bold shadow-md">
                  Remove from admin
                </button>
              ) : (
                <button
                  onClick={handleMakeAdmin}
                  className=" select-none    transition-all duration-300   bg-gradient-to-t  from-teal-500 to-teal-400 text-white px-3 py-2 rounded-lg font-bold shadow-md">
                  Make admin
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

          <div className="w-[300px] relative text-xlmin-h-[500px] p-7 lg:w-[700px]  bg-white shadow-md rounded-md">
            <h1 className="text-lg font-bold">Personal information:</h1>
            <div className="flex gap-40 mt-10">
              <div className="*:mb-5">
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone:</p>
                <p>Admin:</p>
              </div>
              {loadingUser ? (
                <Loader />
              ) : (
                <div className="*:mb-5 font-bold">
                  <p>{user?.name}</p>
                  <p className="text-blue-500 underline">
                    <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                  </p>
                  <p>{user?.phone}</p>
                  <div>
                    {user?.isAdmin ? (
                      <Badge variant="admin">Admin</Badge>
                    ) : (
                      <Badge>Not admin</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {userAddress ? (
            <div className="w-[300px] mt-5 relative text-xlmin-h-[500px] p-7 lg:w-[700px] bg-white shadow-md rounded-md">
              <h1 className="text-lg font-bold">Address:</h1>
              <div className="flex gap-40 mt-10">
                <div className="*:mb-5 ">
                  <p>Province:</p>
                  <p>City:</p>
                  <p>Block:</p>
                  <p>Street:</p>
                  <p>House:</p>
                </div>
                {loadingAddress ? (
                  <Loader />
                ) : (
                  <div className="*:mb-5 font-bold">
                    <p>{userAddress?.province}</p>
                    <p>{userAddress?.city}</p>
                    <p>{userAddress?.block}</p>
                    <p>{userAddress?.street}</p>
                    <p>{userAddress?.house}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Message dismiss={false}>User does not provide address yet</Message>
            </>
          )}
          {userOrders?.length === 0 && <Message dismiss={false}>User does not have orders</Message>}
        </div>

        {userOrders?.length > 0 && (
          <div>
            <div className="">
              <h1 className="text-[20px] font-bold">Customer's orders:</h1>
              <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
            </div>

            <div className="flex flex-col gap-5">
              {userOrders?.map((order) => (
                <div
                  key={order._id}
                  className="flex  flex-col hover:bg-gray-100 transition-all duration-300 gap-5 border bg-white p-4  shadow-md rounded-lg">
                  <div className="flex flex-col gap-5 ">
                    <Link to={`/admin/orders/${order._id}`} className="flex gap-5 ">
                      <h1 className="flex flex-col gap-2 items-center ">
                        Placed in:{" "}
                        <span className="font-bold"> {order.createdAt.substring(0, 10)}</span>
                      </h1>
                      <h1 className="flex flex-col gap-2 items-center ">
                        Payment method: <span className="font-bold">{order.paymentMethod}</span>
                      </h1>
                      <h1 className="flex flex-col gap-2 items-center">
                        Total price:{" "}
                        <span className="font-bold">{order.totalPrice.toFixed(3)} KD</span>
                      </h1>
                      <h1 className="flex flex-col gap-2 items-center">
                        Products:
                        <span className="font-bold">{order?.orderItems.length}</span>
                      </h1>
                      <h1 className="flex flex-col gap-2 items-center">
                        Delivered:
                        <span className="font-bold text-sm">
                          {order?.isDelivered ? (
                            <Badge variant="success">Delivered</Badge>
                          ) : (
                            <Badge variant="pending">Processing</Badge>
                          )}
                        </span>
                      </h1>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "absolute  opacity-1 z-50 bg-white   shadow-lg text-md w-[400px]  h-[150px] rounded-xl px-5 py-6 top-[40%] left-[40%]",
          popUp ? "block" : "hidden"
        )}>
        <h1 className="font-bold">Delete User</h1>
        <h1 className="text-md mt-1">Are you sure you want to delete this user?</h1>
        <div className="flex gap-4 justify-start mt-5 flex-row-reverse ">
          <button
            onClick={handleDeleteUser}
            className="bg-rose-600 text-[14px] font-semibold rounded-lg py-1 text-white px-3  hover:bg-rose-700 shadow-lg">
            {true ? "Delete" : <Spinner />}
          </button>
          <button
            onClick={handleConfirmation}
            className="bg-gradient-to-r from-gray-50 to-white border border-1 px-3 text-[14px] rounded-lg  shadow-lg">
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default UserDetails;
