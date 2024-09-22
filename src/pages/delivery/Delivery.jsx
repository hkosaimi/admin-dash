import Layout from "../../Layout";
import { useState } from "react";
import { useUpdateDeliverMutation } from "../../redux/queries/orderApi";
import { toast } from "react-toastify";
import { useGetDeliveryStatusQuery } from "../../redux/queries/productApi";

function Delivery() {
  const { data: deliveryStatus, refetch } = useGetDeliveryStatusQuery();
  console.log(deliveryStatus);
  const [updateDelivery] = useUpdateDeliverMutation();
  const [timeToDeliver, setTimeToDeliver] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  console.log(timeToDeliver);
  console.log(shippingFee);

  const handleUpdateDelivery = async () => {
    await updateDelivery({ timeToDeliver, shippingFee });
    toast.success("Delivery status updated");
    refetch();
  };
  return (
    <Layout>
      <div className="px-2 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">Delivery:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Time to deliver:</p>
          <p>Delivery fees:</p>
          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-3 rounded-lg shadow [&>select]:w-full lg:[&>select]:w-[200px]   ">
            <select
              onChange={(e) => setTimeToDeliver(e.target.value)}
              value={timeToDeliver}
              className="lg:ml-[-30px] cursor-pointer px-3 py-2 border-2 rounded-lg shadow">
              <option value="" disabled={true}>
                Choose time to deliver
              </option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="two days">2 days</option>
            </select>
            <select
              value={shippingFee}
              onChange={(e) => setShippingFee(e.target.value)}
              className="lg:ml-[-70px] cursor-pointer border-2 px-3 py-2 rounded-lg mr-2 shadow">
              <option value="" disabled={true}>
                Choose shipping fee
              </option>
              <option value="0">Free</option>
              <option value="1">1.000 KD</option>
              <option value="2">2.000 KD</option>
              <option value="3">3.000 KD</option>
              <option value="4">4.000 KD</option>
              <option value="5">5.000 KD</option>
            </select>

            <button
              onClick={handleUpdateDelivery}
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
          <p>Time to deliver:</p>
          <p>Delivery fees:</p>
          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex font-bold flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-5 rounded-lg shadow [&>select]:w-full lg:[&>p]:w-[200px]   ">
            <p className="capitalize ">{deliveryStatus?.timeToDeliver}</p>

            {deliveryStatus?.shippingFee > 0 ? (
              <p>{deliveryStatus?.shippingFee.toFixed(3)} KD</p>
            ) : (
              <p>Free</p>
            )}
            <button className="   text-white text-[20px] py-2 lg:py-0 lg:px-3  lg:w-[200px] lg:font-bold  rounded-lg"></button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Delivery;
