import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ToastWrapper({ children }) {
  return (
    <div>
      <ToastContainer autoClose={4000} />
      {children}
    </div>
  );
}

export default ToastWrapper;
