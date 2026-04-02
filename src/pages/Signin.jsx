import { useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/Frame.svg";
import Run from "../assets/run.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const { login, } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const iconClass = "text-gray-700 hover:text-gray-900 w-5 h-5";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!form.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    setLoading(true);
    try {
      await login(form);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     setLoading(true);
//     try {
//       const { credential } = credentialResponse;
//       await googleAuth({ token: credential });
//       toast.success("Google Login Successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Google login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     toast.error("Google login failed. Please try again.");
//   };

  return (
    <div className="flex gap-[20px]">
      {/* LEFT SIDE */}
      <div className="flex flex-col pl-[100px]">
        <div className="flex items-center gap-2 mt-[70px]">
          <img src={Logo} alt="Logo" />
        </div>

        <h2 className="text-[30px] font-bold mb-6 text-[#000000]">Welcome Back</h2>
        <p className="mb-6">Enter your details to sign in to your account.</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-[11px]">
            <label>Email <span className="text-[#A4003A]">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-[484px] h-[56px] mt-1 px-4 py-3 border rounded-[48px]"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-[11px]">
            <label>Password <span className="text-[#A4003A]">*</span></label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-[484px] h-[56px] px-4 py-3 border rounded-[48px] pr-12"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-12 top-1/2 -translate-y-1/2"
                disabled={loading}
              >
                {showPassword ? <AiOutlineEyeInvisible className={iconClass} /> : <AiOutlineEye className={iconClass} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <Link to="/forgot-password">
            <p className="mb-[20px] text-sm font-medium">Forgot password?</p>
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-[484px] h-[56px] bg-[#77C2FF] text-white rounded-[48px] border-2 border-black shadow-[0_4px_0_0_black] mb-[30px] font-bold disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="border-t border-[#D9D9D9]" />
            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-3 text-sm text-[#666666]">
              Or
            </span>
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="continue_with"
              shape="pill"
              width="484"
              disabled={loading}
            />
          </div>
        </form>

        <div className="flex justify-center font-medium m-6">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#77C2FF]">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-[30px]">
        <img src={Run} alt="Illustration" className="w-[836px] h-[724px] object-cover" />
      </div>
    </div>
  );
};

export default Signin;
