import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/queries/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slices/authSlice";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const Spinner = () => {
  return (
    <div className="size-6 border-4 border-t-4 border-gray-200 border-t-slate-600 border-solid rounded-full animate-spin"></div>
  );
};
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("All fields are required");
      }

      const res = await loginUser({ email, password }).unwrap();
      if (!res.isAdmin) {
        return toast.error("You are not an admin!");
      }

      dispatch(setUserInfo({ ...res }));

      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "an error occurred");
    }
  };
  return (
    <>
      <div className="flex min-h-screen overflow-hidden flex-col items-center justify-center bg-white text-black">
        <div>
          <h1 className="mb-5 text-[20px] font-semibold">Login to your store</h1>
        </div>
        <div className="">
          <form onSubmit={handleLogin}>
            <div className=" h-[40px] bg-opacity-50 w-[300px] rounded-md   bg-gray-100  placeholder:text-grey-40  flex items-center mb-4">
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
              />
            </div>
            <div
              tabIndex={0}
              className="rounded-md border relative  h-[40px]  w-[300px]   bg-gray-100  placeholder:text-grey-40  flex items-center mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4 outline-none outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
              />
              <button
                type="button"
                className="text-grey-40 absolute right-0 focus:text-violet-60 px-4 focus:outline-none"
                onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <Eye strokeWidth={1} />
                ) : (
                  <span>
                    <EyeOff strokeWidth={1} />
                  </span>
                )}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full mt-4 border rounded-lg font-semibold flex items-center justify-center  px-3 py-2  transition-all delay-50 bg-slate-600 text-white hover:bg-slate-800 ">
                {!isLoading ? "Login" : <Spinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
