import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import ProfilePage from "./pages/ProfilePage";
import ProtectedLayout from "./Layout/ProtectedLayout";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import ForgetPassword from "./pages/ForgetPassword";
import CodeVerification from "./pages/CodeVerification";
import CreatePassword from "./pages/CreatePassword";
import ChangePassword from "./pages/ChangePassword"; // ✅ new page
import DashBoard from "./pages/Dashboard";
import CompletedPage from "./pages/CompletedPage";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// ✅ Toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCallback from "./pages/AuthCallback";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/codeverification" element={<CodeVerification />} />
          <Route path="/createpassword" element={<CreatePassword />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/authdash"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/completed" element={<CompletedPage />} />
            {/* ✅ New Change Password route */}
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

   <ToastContainer
  position="top-center"
  autoClose={3500}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  closeButton={false}
  toastClassName="custom-toast"     // ← Important
  toastStyle={{
    border: "2px solid #000000",
    borderRadius: "20px",
    boxShadow: "0 4px 0 0 #000000",
    fontWeight: "600",
  }}
  progressStyle={{ background: "#000000" }}
/>
    </div>
  );
}

export default App;
