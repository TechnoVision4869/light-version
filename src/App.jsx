import { useState, useContext } from "react";
import { SidebarContext } from "./store/SidebarContextProvider";
import Home from "./components/Home";
import ProjectSelector from "./components/ProjectSelector";
import SplashVideo from "./components/SplashVideo";
import LoginPage from "./components/auth/login-page";
import { useAuth } from "./components/hooks/use-auth";

export default function App() {
  const { isAuthenticated } = useAuth();
  const { currentProject, setCurrentProject } = useContext(SidebarContext);
  const [showSplash, setShowSplash] = useState(false);

  const handleProjectSelect = (project) => {
    setCurrentProject(project);
    setShowSplash(true);
  };

  const getIntroVideoUrl = () => {
    if (!currentProject) return null;
    return currentProject?.introVideo || `/kog/videos/home/intro1.mp4`;
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<ProjectSelector onProjectSelect={handleProjectSelect} />} />
      <Route
        path="/home"
        element={
          showSplash ? (
            <SplashVideo src={getIntroVideoUrl()} onFinished={() => setShowSplash(false)} />
          ) : (
            <Home />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}