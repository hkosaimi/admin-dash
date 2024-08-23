import Layout from "../../Layout";

function Delivery() {
  return (
    <Layout>
      <div className="px-2 py-3 mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="">
          <h1 className="text-[20px] font-bold">Delivery:</h1>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
        </div>
        <div className="lg:flex hidden flex-col lg:flex-row justify-around gap-4 px-3  lg:w-[1000px] mb-5 text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
          <p>Time to deliver</p>
          <p>Delivery fee</p>
          <p></p>
        </div>
        <div className="w-[300px] lg:w-[1000px] mb-5">
          <div className="flex  flex-col lg:flex-row w-full justify-around gap-[30px] lg:gap-0 bg-white px-3 py-3 rounded-lg shadow-md [&>select]:w-full lg:[&>select]:w-[200px]   ">
            <select className="lg:ml-[-30px] cursor-pointer px-3 py-2 border-2 rounded-lg shadow-md">
              <optgroup label="Swedish Cars">
                <option value="">Today</option>
                <option value="">Tomorrow</option>
                <option value="">2 days</option>
              </optgroup>
            </select>
            <select className="lg:ml-[-70px] cursor-pointer border-2 px-3 py-2 rounded-lg mr-2 shadow-md">
              <option value="">Free</option>
              <option value="">1 KD</option>
              <option value="">2 KD</option>
              <option value="">3 KD</option>
              <option value="">4 KD</option>
              <option value="">5 KD</option>
            </select>

            <button className="bg-gradient-to-t from-teal-500 to-teal-400 hover:bg-teal-700 text-white text-[20px] py-2 lg:py-0 lg:px-3 shadow-lg lg:w-[200px] lg:font-bold  rounded-[18px]">
              save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Delivery;
