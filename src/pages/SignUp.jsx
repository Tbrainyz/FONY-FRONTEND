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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    if (!form.phone) err.phone = "Phone is required";
    if (!form.password) err.password = "Password is required";
    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }
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
      await register(form);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
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
            className="h-10 mb-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <h2 className="text-3xl font-bold mb-2">Create Account </h2>
          <p className="text-gray-500 mb-8">
            Start managing your tasks smarter
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="w-full h-14 px-5 rounded-2xl border border-gray-300"
                />
                <p className="h-5 mt-1 text-sm text-red-500">
                  {errors[field] || ""}
                </p>
              </div>
            ))}

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-14 px-5 rounded-2xl border border-gray-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[35%] -translate-y-1/2"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              <p className="h-5 mt-1 text-sm text-red-500">
                {errors.password || ""}
              </p>
            </div>

            {/* CONFIRM */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full h-14 px-5 rounded-2xl border border-gray-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-[35%] -translate-y-1/2"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              <p className="h-5 mt-1 text-sm text-red-500">
                {errors.confirmPassword || ""}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#77C2FF] text-white rounded-2xl font-semibold disabled:opacity-60"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleRegister}
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
            Have an account?{" "}
            <Link to="/login" className="text-[#77C2FF] font-medium">
              Login
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

export default SignUp;
