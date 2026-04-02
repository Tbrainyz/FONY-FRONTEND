import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Decode the JWT payload to get user info
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
          id: payload.sub,
          role: payload.role,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
        };
        saveUser(user, token);
        navigate("/dashboard");
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-[16px] text-[#666666]">Logging you in...</p>
    </div>
  );
};

export default AuthCallback;
