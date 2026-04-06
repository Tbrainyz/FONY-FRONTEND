import { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveUser } = useContext(AuthContext);
  
  // Prevent multiple executions
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication failed. No token received.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      // Decode JWT to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));

      const userData = {
        _id: payload.id,
        name: payload.name,
        email: payload.email,
        profilePicture: payload.profilePicture || "",
        role: payload.role || "user",
      };

      // Save user properly
      saveUser(userData, token);

      toast.success(`Welcome back, ${userData.name}!`);

      // Navigate to dashboard and replace history to prevent back button issues
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("Callback processing error:", error);
      toast.error("Failed to complete login. Please try again.");
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, saveUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#77C2FF] border-t-transparent rounded-full mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">Completing your login...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait</p>
      </div>
    </div>
  );
};

export default AuthCallback;