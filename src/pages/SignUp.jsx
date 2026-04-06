import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Logo from "../assets/Frame.svg";
import Run from "../assets/run.svg";
import Google from "../assets/material.svg";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup / Login (same endpoint)
  const handleGoogleRegister = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/api/users/google`;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10">
            <img src={Logo} alt="Logo" className="h-10" />
          </div>

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">Enter your details to sign up for an account.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Name <span className="text-red-600">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full h-14 px-5 border border-gray-300 rounded-3xl focus:outline-none focus:border-[#77C2FF]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email <span className="text-red-600">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full h-14 px-5 border border-gray-300 rounded-3xl focus:outline-none focus:border-[#77C2FF]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone <span className="text-red-600">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full h-14 px-5 border border-gray-300 rounded-3xl focus:outline-none focus:border-[#77C2FF]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password <span className="text-red-600">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 focus:outline-none focus:border-[#77C2FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Password <span className="text-red-600">*</span></label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full h-14 px-5 border border-gray-300 rounded-3xl pr-12 focus:outline-none focus:border-[#77C2FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-4 bg-[#77C2FF] text-white font-bold rounded-3xl border-2 border-black shadow-[0_4px_0_0_black] active:translate-y-0.5 disabled:opacity-70 transition-all"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="relative my-6">
              <div className="border-t border-gray-300" />
              <span className="absolute left-1/2 -top-3 bg-gray-50 px-4 text-sm text-gray-500">Or</span>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full h-14 border border-gray-300 rounded-3xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
            >
              <img src={Google} alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>
          </form>

          <p className="text-center mt-8 text-sm">
            Have an account?{" "}
            <Link to="/login" className="text-[#77C2FF] font-medium hover:underline">Login</Link>
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

export default SignUp;