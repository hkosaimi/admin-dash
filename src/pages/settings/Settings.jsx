import Layout from "../../Layout";
import { useState } from "react";
import { ShieldCheck, Pickaxe } from "lucide-react";
import { toast } from "react-toastify";
import {
  useUpdateStoreStatusMutation,
  useGetStoreStatusQuery,
} from "../../redux/queries/maintenanceApi";

function Settings() {
  const [updateStoreStatus] = useUpdateStoreStatusMutation();
  const { data: storeStatus, refetch } = useGetStoreStatusQuery();
  console.log(storeStatus);
  const [status, setStatus] = useState("");
  console.log(status);

  const handleUpdateStoreStatus = async () => {
    await updateStoreStatus({ status });
    toast.success("Store status updated successfully");
    refetch();
  };
  return (
    <Layout>
      <div className="px-2 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">Settings:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Store condition:</p>

          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-3 rounded-lg shadow [&>select]:w-full lg:[&>select]:w-[200px]   ">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="lg:ml-[-30px] cursor-pointer px-3 py-2 border-2 rounded-lg shadow">
              <option value="" disabled={true}>
                Choose condition
              </option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <button
              onClick={handleUpdateStoreStatus}
              className="bg-gradient-to-t from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-600/95 text-white text-[20px] py-2 lg:py-0 lg:px-3 shadow-lg lg:w-[200px] lg:font-bold  rounded-lg">
              save
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="text-[20px] mt-20 font-bold">Current status:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Store condition</p>

          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-5 rounded-lg shadow [&>select]:w-full lg:[&>p]:w-[200px]   ">
            {storeStatus?.status === "active" ? (
              <p className="flex gap-2 font-bold text-teal-600">
                <ShieldCheck />
                {storeStatus?.status.toUpperCase()}
              </p>
            ) : (
              <p className="flex gap-2 font-bold text-rose-600 ">
                <Pickaxe />
                {storeStatus?.status.toUpperCase()}
              </p>
            )}

            <button className="   text-white text-[20px] py-2 lg:py-0 lg:px-3  lg:w-[200px] lg:font-bold  rounded-lg"></button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
