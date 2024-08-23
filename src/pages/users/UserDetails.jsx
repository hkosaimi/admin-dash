import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../Layout";
import clsx from "clsx";
import { useGetUserDetailsQuery } from "../../redux/queries/userApi";

function UserDetails() {
  const { userID } = useParams();

  const [popUp, setPopUp] = useState(false);

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userID);

  const handleConfirmation = () => {
    setPopUp(!popUp);
  };
  return (
    <Layout>
      <div className="px-4 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">Customer's information:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="w-[300px] relative text-xlmin-h-[500px] p-7 lg:w-[1000px] bg-white shadow-md rounded-md">
          <h1 className="text-lg font-bold">Personal information:</h1>
          <div className="flex gap-40 mt-10">
            <div className="*:mb-5">
              <p>Name:</p>
              <p>Email:</p>
              <p>Phone:</p>
            </div>
            <div className="*:mb-5">
              <p>{user?.name}</p>
              <p href={`mailto:${user?.email}`}>{user?.email}</p>
              <p>{user?.phone}</p>
            </div>
          </div>
        </div>
        <div className="w-[300px] mt-5 relative text-xlmin-h-[500px] p-7 lg:w-[1000px] bg-white shadow-md rounded-md">
          <h1 className="text-lg font-bold">Address:</h1>
          <div className="flex gap-40 mt-10">
            <div className="*:mb-5">
              <p>Province:</p>
              <p>City:</p>
              <p>Block:</p>
              <p>Street:</p>
              <p>House:</p>
            </div>
            <div className="*:mb-5">
              <p>Aljahra</p>
              <p>Jaber AlAhmad</p>
              <p>6</p>
              <p>5</p>
              <p>20</p>
            </div>
          </div>
        </div>
        <div
          onClick={handleConfirmation}
          className="mt-5 select-none cursor-pointer active:bg-red-900 hover:bg-red-800 float-right bg-red-500 text-white px-3 py-2 rounded-lg font-bold shadow-md">
          Delete
        </div>
        <div
          className={clsx(
            "absolute bg-gradient-to-r  from-slate-100  to-slate-50 shadow-lg text-md w-[300px] text-center h-[180px] rounded-lg px-5 py-5 top-[40%] left-[40%]",
            popUp ? "block" : "hidden"
          )}>
          <h1 className="text-lg">Are you sure you want to delete this user?</h1>
          <div className="flex gap-4 justify-between mt-7 flex-row-reverse ">
            <button className="bg-red-500 font-bold rounded-lg text-white px-3 py-2 hover:bg-red-600 shadow-lg">
              Confirm
            </button>
            <button
              onClick={handleConfirmation}
              className="bg-slate-200 px-3 py-2 rounded-lg hover:bg-slate-300 shadow-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserDetails;
