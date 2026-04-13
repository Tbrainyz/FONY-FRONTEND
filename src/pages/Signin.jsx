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
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let err = {};
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await login(form);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/api/users/google`;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 mb-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <h2 className="text-3xl font-bold mb-2">Welcome Back </h2>
          <p className="text-gray-500 mb-8">
            Login to continue managing your tasks
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full h-14 px-5 rounded-2xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#77C2FF]`}
              />
              <p className="h-5 mt-1 text-sm text-red-500">
                {errors.email || ""}
              </p>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full h-14 px-5 rounded-2xl border pr-12 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#77C2FF]`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[35%] -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>

              <p className="h-5 mt-1 text-sm text-red-500">
                {errors.password || ""}
              </p>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-[#77C2FF] block text-right"
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] text-white font-semibold rounded-2xl shadow-md disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="border-t"></div>
              <span className="absolute left-1/2 -top-3 bg-gray-50 px-3 text-sm text-gray-400">
                OR
              </span>
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full h-14 border rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="text-sm">Redirecting...</span>
              ) : (
                <>
                  <img src={Google} className="w-5" />
                  Continue with Google
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#77C2FF] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <img src={Run} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
};

export default Signin;
