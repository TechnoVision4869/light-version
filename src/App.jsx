import { useState, useContext, useEffect } from "react";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { Capacitor } from "@capacitor/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarContext } from "./store/SidebarContextProvider";
import Home from "./components/Home";
import { AuthGuard } from "./components/auth/auth-guard";
import SelectionFlow from "./components/SelectionFlow";
import SplashVideo from "./components/SplashVideo";
import LoginPage from "./components/auth/login-page";
import AdminDashboard from "./components/admin/AdminDashboard";
import UsersPage from "./components/user/UsersPage";

export default function App() {
  const { currentProject, setCurrentProject } = useContext(SidebarContext);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (Capacitor.getPlatform() !== "web") {
          await ScreenOrientation.lock({ orientation: "landscape" });
        }
      } catch (error) {
        console.warn("Failed to lock screen orientation", error);
      }
    };
    lockOrientation();
  }, []);

  const handleProjectSelect = (project) => {
    setCurrentProject(project);
    setShowSplash(true);
    navigate("/home");
  };

  const getIntroVideoUrl = () => {
    if (!currentProject) return null;
    return currentProject?.introVideoId;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <SelectionFlow onProjectSelect={handleProjectSelect} />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/users"
        element={
          <AuthGuard>
            <UsersPage />
          </AuthGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            {showSplash ? (
              <SplashVideo
                src={getIntroVideoUrl()}
                onFinished={() => setShowSplash(false)}
              />
            ) : (
              <Home />
            )}
          </AuthGuard>
        }
      />
    </Routes>
  );
}
