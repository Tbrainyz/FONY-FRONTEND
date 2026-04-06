import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveUser } = useContext(AuthContext);
  const [status, setStatus] = useState("Logging you in...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication failed. No token received.");
      navigate("/login");
      return;
    }

    const completeLogin = async () => {
      try {
        // First, try to decode token for immediate user info
        const payload = JSON.parse(atob(token.split(".")[1]));

        const userData = {
          _id: payload.id,
          name: payload.name,
          email: payload.email,
          profilePicture: payload.profilePicture || "",
          role: payload.role || "user",
        };

        // Save to context + localStorage
        saveUser(userData, token);

        toast.success(`Welcome back, ${userData.name}!`);
        navigate("/dashboard", { replace: true });

      } catch (error) {
        console.error("Callback error:", error);
        toast.error("Failed to process login. Please try again.");
        navigate("/login");
      }
    };

    completeLogin();
  }, [searchParams, navigate, saveUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#77C2FF] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-[16px] text-gray-600">{status}</p>
      </div>
    </div>
  );
};

export default AuthCallback;