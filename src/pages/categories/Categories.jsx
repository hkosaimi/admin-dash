import Layout from "../../Layout";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <Layout>
      <div className="px-4 flex flex-row-reverse justify-between py-3 mt-[50px] ml-0 lg:ml-[50px]  ">
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-bold">Categories:</h1>
            <h1 className="bg-white shadow-md hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer">
              create new category
            </h1>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

          <div className="lg:flex hidden justify-around gap-4 px-3  w-[1000px] mb-5 lg:mt-[50px] text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
            <p>Name:</p>
            <p>Number of products:</p>
          </div>
          <div className="w-[300px] lg:w-[1000px] mb-5">
            <Link
              href="/"
              className="flex w-full flex-col lg:flex-row justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden hover:bg-gray-100">
              <p> Iphone</p>
              <p>10</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
