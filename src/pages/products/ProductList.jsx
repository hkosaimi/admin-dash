import { Link } from "react-router-dom";
import Layout from "../../Layout";

function ProductList() {
  return (
    <Layout>
      <div className="px-4 flex flex-row-reverse justify-between py-3 mt-[50px] ml-0 lg:ml-[50px]  ">
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-bold">Products:</h1>
            <h1 className="bg-white shadow-md hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer">
              create new product
            </h1>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

          <div className="lg:flex hidden justify-around gap-4 px-3  w-[1000px] mb-5 lg:mt-[50px] text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
            <p>Name:</p>
            <p>Collection:</p>
            <p>In stock:</p>
            <p>price:</p>
            <p></p>
          </div>
          <div className="w-[300px] lg:w-[1000px] mb-5">
            <Link
              href="/"
              className="flex w-full flex-col lg:flex-row justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden hover:bg-gray-100">
              <p> IPhone 13</p>
              <p>IPhone</p>
              <p>10</p>
              <p> 150.00 KD</p>
              <div className="lg:w-[200px] flex justify-around">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-[#F43F5E]  ">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-pencil">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="w-[300px] lg:w-[1000px] ">
            <Link
              href="/"
              className="flex w-full flex-col lg:flex-row justify-around hover:bg-gray-100 gap-4 bg-white px-3 py-3 rounded-lg shadow-md [&>p]:w-[200px] [&>p]:overflow-hidden">
              <p> Galaxy watch 6</p>
              <p>Samsung</p>
              <p>10</p>
              <p>150.00 KD</p>
              <div className="lg:w-[200px] flex justify-around">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-[#F43F5E]  ">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-pencil">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductList;
