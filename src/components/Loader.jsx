import React from "react";

const Loader = () => {
  return (
    <div className="flex absolute inset-0 items-center justify-center ">
      <div className="w-14 h-14 border-4 border-t-4 border-t-white border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
