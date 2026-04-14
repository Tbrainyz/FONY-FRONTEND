import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // ← Add this
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}

    <ThemeProvider>
      {" "}
      {/* ← Wrap everything with ThemeProvider */}
      <AuthProvider>
        <TaskProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>

    {/* </GoogleOAuthProvider> */}
  </StrictMode>,
);
