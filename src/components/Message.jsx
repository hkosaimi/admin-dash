import { TriangleAlert, ShieldCheck, CircleAlert, X, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

function Message({ dismiss = true, variant = "primary", children }) {
  const [close, setClose] = useState(false);
  const handleClose = () => {
    setClose(true);
  };

  if (variant === "danger") {
    return (
      <motion.div
        className={clsx(
          "text-red-600 relative items-center  bg-red-100   flex mt-5 px-3 py-3 rounded-lg  top-0  gap-5 font-bold ",
          close && "hidden"
        )}>
        <TriangleAlert strokeWidth={2} />
        <div>
          <h1>Error !</h1>
          <p className="text-[16px] font-normal">{children}</p>
        </div>
        {dismiss && (
          <X size={20} className="absolute top-2 right-2 cursor-pointer" onClick={handleClose} />
        )}
      </motion.div>
    );
  }
  if (variant === "success") {
    return (
      <div
        className={clsx(
          "text-teal-600 bg-teal-100 items-center relative flex mt-5 px-3 py-3 rounded-lg gap-5 font-bold",
          close && "hidden"
        )}>
        <ShieldCheck strokeWidth={2} />
        <div>
          <h1>Success</h1>
          <p className="text-[16px] font-normal">{children}</p>
        </div>
        <X size={20} className="absolute top-2 right-2 cursor-pointer" onClick={handleClose} />
      </div>
    );
  }
  if (variant === "warning") {
    return (
      <div
        className={clsx(
          "text-orange-600 bg-orange-100 items-center relative flex mt-5 px-3 py-3 rounded-lg gap-5 font-bold",
          close && "hidden"
        )}>
        <CircleAlert strokeWidth={2} />
        <div>
          <h1>Warning </h1>
          <p className="text-[16px] font-normal">{children}</p>
        </div>
        <X size={20} className="absolute top-2 right-2 cursor-pointer" onClick={handleClose} />
      </div>
    );
  }
  if (variant === "primary") {
    return (
      <div
        className={clsx(
          "text-blue-600 max-w-full  bg-sky-100 items-center relative flex mt-5 px-3 py-3 rounded-lg gap-5 font-bold",
          close && "hidden"
        )}>
        <Lightbulb strokeWidth={2} />
        <div>
          <h1>Info </h1>
          <p className="text-[16px] font-normal">{children}</p>
        </div>
        <X size={20} className="absolute top-2 right-2 cursor-pointer" onClick={handleClose} />
      </div>
    );
  }
}

export default Message;
