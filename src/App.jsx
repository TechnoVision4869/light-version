import { useState, useContext, useEffect } from "react";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { Capacitor } from "@capacitor/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarContext } from "./store/SidebarContextProvider";
import Home from "./components/Home";
import { AuthGuard } from "./components/auth/auth-guard";
import ProjectSelector from "./components/ProjectSelector";
import SplashVideo from "./components/SplashVideo";
import LoginPage from "./components/auth/login-page";
// import DashboardPage from "./components/dashboard/dashboard-page";
// import SettingsPage from "./components/settings/settings-page";

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

  const getProjectSlug = (project) => {
    const name = project?.name || project?.title || project?.id || "";
    return name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleProjectSelect = (project) => {
    setCurrentProject(project);
    setShowSplash(true);
    const projectSlug = getProjectSlug(project);
    navigate(`/${projectSlug}`);
  };

  const getIntroVideoUrl = () => {
    if (!currentProject) return null;
    return currentProject?.introVideo || `/kog/videos/home/intro1.mp4`;
  };

  return (
    // <Routes>
    //   <Route path="/" element={<ProjectSelector onProjectSelect={handleProjectSelect} />} />
    //   <Route
    //     path="/:projectSlug"
    //     element={
    //       showSplash ? (
    //         <SplashVideo src={getIntroVideoUrl()} onFinished={() => setShowSplash(false)} />
    //       ) : (
    //         <Home />
    //       )
    //     }
    //   />
    // </Routes>

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <ProjectSelector onProjectSelect={handleProjectSelect} />
          </AuthGuard>
        }
      />
      <Route
        path="/:projectSlug"
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
