import SideMenu from "./components/SideMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const storeName = "Xelectronics";
  return (
    <>
      <div className="flex  gap-5 font-[Manrope] bg-zinc-200/30 transition-all duration-500 ease-in-out">
        <SideMenu storeName={storeName} />
        {children}
      </div>
    </>
  );
}

export default Layout;
