import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { useGetUsersQuery } from "../../redux/queries/userApi";
import { Check, X } from "lucide-react";
import Paginate from "../../components/Paginate";
function Customers() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetUsersQuery({ pageNumber });
  console.log(data);
  return (
    <Layout>
      <div className="px-4 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">All customers:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex lg:mt-[50px] flex-col hidden lg:flex-row justify-around gap-4 px-3  w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Created at</p>
          <p>Admin</p>
        </div>

        {data?.users?.map((user) => (
          <div className="w-[300px] lg:w-[1000px] mb-5">
            <Link
              to={`/admin/userlist/${user._id}`}
              className="flex flex-col lg:flex-row w-full justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden [&>p]:truncate hover:bg-gray-100">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.createdAt.substring(0, 10)}</p>
              <p>
                {user.isAdmin ? (
                  <Check className="text-teal-500" strokeWidth={4} />
                ) : (
                  <X className="text-red-500" strokeWidth={4} />
                )}
              </p>
            </Link>
          </div>
        ))}
        <Paginate pages={data?.pages} page={data?.page} />
      </div>
    </Layout>
  );
}

export default Customers;
