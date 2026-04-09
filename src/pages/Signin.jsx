import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Logo from "../assets/Frame.svg";
import Run from "../assets/run.svg";
import Google from "../assets/material.svg";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    toast.error("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    await login(form);
    toast.success("Login Successful!");
    navigate("/dashboard");
  } catch (err) {
    // 🔥 IMPORTANT: Do NOTHING if it's a blocked account
    if (err.message === "Account blocked") {
      // The blocked message is already shown from AuthContext
      // So we silently ignore it here
      console.log("Blocked account - toast already handled");
    } else {
      // Only show "Invalid credentials" for normal login failures
      toast.error("Invalid credentials");
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/api/users/google`;
  };
   const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10">
            <img src={Logo} alt="Logo" className="h-10" onClick={handleLogoClick} />
          </div>

          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-8">
            Enter your details to sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full h-14 px-5 border border-gray-300 rounded-3xl focus:outline-none focus:border-[#77C2FF]"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 focus:outline-none focus:border-[#77C2FF]"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                  disabled={loading}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-[#77C2FF] block text-right hover:underline"
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="relative my-6">
              <div className="border-t border-gray-300" />
              <span className="absolute left-1/2 -top-3 bg-gray-50 px-4 text-sm text-gray-500">
                Or
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-14 border border-gray-300 rounded-3xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
            >
              <img src={Google} alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>
          </form>

          <p className="text-center mt-8 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#77C2FF] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-100 items-center justify-center">
        <img src={Run} alt="Illustration" className="max-h-[90%] object-contain" />
      </div>
    </div>
  );
};

export default Signin;