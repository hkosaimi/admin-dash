import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { useGetUsersQuery } from "../../redux/queries/userApi";
import { Check, X } from "lucide-react";
import Paginate from "../../components/Paginate";
import { Users } from "lucide-react";
import Badge from "../../components/Badge";

function Customers() {
  const { pageNumber } = useParams();
  const [prevUserCount, setPrevUserCount] = useState(0);
  const { data, isLoading, error, refetch } = useGetUsersQuery({ pageNumber });
  /*   useEffect(() => {
    if (data?.users) {
      const currentUserCount = data?.totalUsers;
      if (currentUserCount < prevUserCount) {
        // If the current user count is less than the previous count, refetch
        refetch();
      }
      // Update the previous user count to the current count
      setPrevUserCount(currentUserCount);
    }
  }, [data?.totalUsers, prevUserCount, refetch]); */

  useEffect(() => {
    if (data?.totalUsers) {
      refetch();
    }
  }, [data?.totalUsers]);
  return (
    <Layout>
      <div className="flex px-4 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <div className="flex gap-2 lg:gap-5 text-sm lg:text-xl items-center">
            <h1 className="text-[20px] font-bold">All customers:</h1>
            <Badge icon={false}>
              <Users />
              {data?.totalUsers > 0 ? data?.totalUsers : "0"} users
            </Badge>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

          <div className="lg:flex lg:mt-[50px] flex-col hidden lg:flex-row justify-around gap-4 px-3  w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
            <p>Name:</p>
            <p>Email:</p>
            <p>Phone:</p>
            <p>Registerd at:</p>
            <p>Admin:</p>
          </div>
          {data?.users?.map((user) => (
            <div key={user._id} className="w-[300px] lg:w-[1000px] mb-5">
              <Link
                to={`/admin/userlist/${user._id}`}
                className="flex flex-col text-sm lg:text-lg lg:flex-row w-full justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow [&>p]:w-[200px] [&>p]:overflow-hidden [&>p]:truncate hover:bg-gray-100">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.createdAt.substring(0, 10)}</p>
                <div className="w-[200px]">
                  {user.isAdmin ? (
                    <Badge variant="admin">Admin</Badge>
                  ) : (
                    <Badge variant="primary">Not admin</Badge>
                  )}
                </div>
              </Link>
            </div>
          ))}
          <Paginate pages={data?.pages} page={data?.page} />
        </div>
      </div>
    </Layout>
  );
}

export default Customers;
