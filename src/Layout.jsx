import React from "react";
import SideMenu from "./components/SideMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  return (
    <>
      <div className="flex gap-5 bg-gray-200/40">
        <SideMenu />
        {children}
        <ToastContainer />
      </div>
    </>
  );
}

export default Layout;
