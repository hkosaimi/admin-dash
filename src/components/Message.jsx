import { TriangleAlert, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
function Message({ variant, children }) {
  if (variant === "danger") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-red-600  bg-red-100 absolute  flex mt-5 px-3 py-3 rounded-lg  top-0  gap-5 font-bold ">
        <TriangleAlert strokeWidth={2} />
        {children}
      </motion.div>
    );
  }
  if (variant === "success") {
    return (
      <div className="text-teal-600 bg-teal-100 flex mt-5 px-3 py-3 rounded-lg gap-5 font-bold">
        <ShieldCheck strokeWidth={2} />
        {children}
      </div>
    );
  }
}

export default Message;
