import clsx from "clsx";
function Spinner({ className }) {
  return (
    <div
      className={clsx(
        "size-6 border-4 border-t-4 border-gray-200  border-solid rounded-full animate-spin",
        className && className
      )}></div>
  );
}

export default Spinner;
