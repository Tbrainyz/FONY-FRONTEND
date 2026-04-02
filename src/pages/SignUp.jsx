import { useState, useContext } from "react";
import Logo from "../assets/Frame.svg";
import Run from "../assets/run.svg";
import Google from "../assets/material.svg";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // ✅ Validation
    if (!formData.name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!formData.phone) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success("Registration successful");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  const iconClass = "text-gray-700 hover:text-gray-900 w-5 h-5";

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/users/google`;
  };

  return (
    <div className="flex gap-[20px]">
      {/* LEFT SIDE */}
      <div className="flex flex-col pl-[100px] pb-[48px] pt-[40px]">
        <div className="mb-6 mt-[70px] flex items-center gap-2">
          <img src={Logo} alt="Logo" />
        </div>

        <h2 className="mb-6 text-[30px] font-bold text-black">
          Create Account
        </h2>

        <p className="mb-6">Enter your details to sign up for an account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[11px]">
          {/* NAME */}
          <div>
            <label>
              Name <span className="text-[#A4003A]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 mb-[5px] h-[56px] w-[484px] rounded-[48px] border px-4 py-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label>
              Email <span className="text-[#A4003A]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1 mb-[5px] h-[56px] w-[484px] rounded-[48px] border px-4 py-3"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label>
              Phone <span className="text-[#A4003A]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 mb-[5px] h-[56px] w-[484px] rounded-[48px] border px-4 py-3"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label>
              Password <span className="text-[#A4003A]">*</span>
            </label>
            <div className="relative mb-[5px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 h-[56px] w-[484px] rounded-[48px] border px-4 py-3 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className={iconClass} />
                ) : (
                  <AiOutlineEye className={iconClass} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label>
              Confirm Password <span className="text-[#A4003A]">*</span>
            </label>
            <div className="relative mb-[5px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="mt-1 h-[56px] w-[484px] rounded-[48px] border px-4 py-3 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className={iconClass} />
                ) : (
                  <AiOutlineEye className={iconClass} />
                )}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-[24px] mb-[30px] h-[56px] w-[484px] rounded-[48px] border-[2px] border-black bg-[#77C2FF] px-[12px] py-[19px] text-white shadow-[0_4px_0_0_black]"
          >
            Sign Up
          </button>

          {/* OR */}
          <div className="relative my-6">
            <div className="border-t border-[#D9D9D9]" />
            <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-3 text-sm text-[#666666]">
              Or
            </span>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="flex h-[60px] w-[484px] items-center justify-center rounded-[48px] border border-[#D9D9D9] hover:bg-[#D9D9D9]"
          >
            <img src={Google} alt="Google" className="mr-2 h-[24px] w-[24px]" />
            Continue with Google
          </button>
        </form>

        <div className="m-6 flex items-center justify-center font-medium">
          <p>
            Have an account?{" "}
            <Link to="/login" className="text-[#77C2FF]">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-[30px]">
        <img
          src={Run}
          alt="Illustration"
          className="h-[900px] w-[836px] object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
