import Layout from "../../Layout";
import { useGetProductsQuery } from "../../redux/queries/productApi";
import { useState } from "react";
import { useUpdateDiscountMutation } from "../../redux/queries/productApi";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { useGetDiscountStatusQuery } from "../../redux/queries/productApi";
import Badge from "../../components/Badge";

function discounts() {
  const { data: products } = useGetProductsQuery();
  const categories = [...new Set(products?.map((p) => p.category))];
  const [discount, setDiscount] = useState("0.0");
  const [category, setCategory] = useState("all");
  const [updateDiscount] = useUpdateDiscountMutation();
  const { data: discountStatus, refetch } = useGetDiscountStatusQuery();
  console.log(discountStatus);

  const handleUpdateDiscount = async () => {
    await updateDiscount({ category, discountBy: discount });
    toast.success("Discount status updated");
    refetch();
  };
  return (
    <Layout>
      <div className="px-2 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">Discounts:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Discount by:</p>
          <p>Category:</p>
          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-3 rounded-lg shadow [&>select]:w-full lg:[&>select]:w-[200px]   ">
            <select
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              className="lg:ml-[-30px] cursor-pointer px-3 py-2 border-2 rounded-lg shadow">
              <option value="0.0">None</option>
              <option value="0.05">5%</option>
              <option value="0.1">10%</option>
              <option value="0.2">20%</option>
              <option value="0.3">30%</option>
              <option value="0.4">40%</option>
              <option value="0.5">50%</option>
              <option value="0.6">60%</option>
              <option value="0.7">70%</option>
              <option value="0.8">80%</option>
              <option value="0.9">90%</option>
              <option value="1">100%</option>
            </select>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="lg:ml-[-70px] cursor-pointer border-2 px-3 py-2 rounded-lg mr-2 shadow">
              <option value="all">All categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={handleUpdateDiscount}
              className="bg-gradient-to-t  from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-600/95 transition-all duration-500 delay-200 text-white text-[20px] py-2 lg:py-0 lg:px-3 shadow-lg lg:w-[200px] lg:font-bold  rounded-lg">
              save
            </button>
          </div>
          <Message dismiss={false}>
            new price = old price - (old price * discount percentage)
          </Message>
        </div>
        <div className="">
          <h1 className="text-[20px] font-bold mt-20">Current status:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Discount by:</p>
          <p>Category:</p>
          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-5 rounded-lg shadow [&>select]:w-full lg:[&>p]:w-[200px]   ">
            <p className="font-bold">{discountStatus?.discountBy * 100}%</p>
            <p className="font-bold">{discountStatus?.category.toUpperCase()} Categories</p>

            <button className=" ext-white text-[20px] py-2 lg:py-0 lg:px-3  lg:w-[200px] lg:font-bold  rounded-lg"></button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default discounts;
