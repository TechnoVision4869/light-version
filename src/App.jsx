import { useState, useContext, useEffect } from "react";
import ExpiredDialog from "./components/ExpiredDialog";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { App as CapApp } from "@capacitor/app";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarContext } from "./store/SidebarContextProvider";
import Home from "./components/Home";
import { AuthGuard } from "./components/auth/auth-guard";
import SelectionFlow from "./components/SelectionFlow";
import SplashVideo from "./components/SplashVideo";
import LoginPage from "./components/auth/login-page";
import AdminDashboard from "./components/admin/AdminDashboard";
import UsersPage from "./components/user/UsersPage";
import ImmersiveGate from "./components/ImmersiveGate";


export default function App() {
  const { currentProject, setCurrentProject, clearSelectedProject } = useContext(SidebarContext);
  const [showSplash, setShowSplash] = useState(false);
  const [showExitSplash, setShowExitSplash] = useState(false);
  const [splashVideoUrl, setSplashVideoUrl] = useState(null);
  const [expired, setExpired] = useState(false);
  const [isNavigatingToHome, setIsNavigatingToHome] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Expiry logic: set expiry date here (YYYY-MM-DD)
    // const expiryDate = new Date("2026-05-01T12:00:00Z");
    // const now = new Date();
    // if (now > expiryDate) {
    //   setExpired(true);
    // }

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

  useEffect(() => {
    const hideBars = async () => {
      if (Capacitor.getPlatform() !== "web") {
        await StatusBar.hide();
        await StatusBar.setOverlaysWebView({ overlay: true });
      }
    };
    hideBars();
    const resumeListener = CapApp.addListener("resume", hideBars);

    return () => {
      resumeListener.then((listener) => listener.remove());
    };
  }, []);

  useEffect(() => {
    if (!splashVideoUrl) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = splashVideoUrl;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [splashVideoUrl]);

  const handleProjectSelect = (project, introVideoUrl, developerId) => {
    setCurrentProject(project, developerId);
    setSplashVideoUrl(introVideoUrl ?? null);
    setIsNavigatingToHome(false); // Reset flag for new splash sequence
    // Delay splash mount slightly to coordinate with press visual effect
    setTimeout(() => {
      setShowSplash(true);
    }, 200);
  };

  const handleSplashReady = () => {
    // Navigate only once splash video is confirmed loaded
    if (!isNavigatingToHome) {
      setIsNavigatingToHome(true);
      // Delay to let opacity transition (500ms) visually take effect before rendering Home
      setTimeout(() => {
        navigate("/home");
      }, 450);
    }
  };

  const handleSplashFinished = () => {
    setShowSplash(false);
    // Fallback: navigate if splash failed to load (error path)
    if (!isNavigatingToHome) {
      setIsNavigatingToHome(true);
      navigate("/home");
    }
  };

  const handleExitRequest = () => {
    setShowExitSplash(true);
  };

  if (expired) {
    return <ExpiredDialog open={true} />;
  }

  return (
    <>
      <ImmersiveGate />
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
              <Home introVideoUrl={splashVideoUrl} onExitRequest={handleExitRequest} />
            </AuthGuard>
          }
        />
      </Routes>
      {showSplash && (
        <SplashVideo
          src={splashVideoUrl}
          onReady={handleSplashReady}
          onFinished={handleSplashFinished}
        />
      )}
      {showExitSplash && (
        <SplashVideo
          src={splashVideoUrl}
          onFadeStart={() => navigate("/")}
          onFinished={() => {
            setShowExitSplash(false);
            clearSelectedProject();
          }}
        />
      )}
    </>
  );
}
