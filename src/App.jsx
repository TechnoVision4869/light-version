import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarContext } from './store/SidebarContextProvider';
import Home from "./components/Home";
import ProjectSelector from './components/ProjectSelector';
import SplashVideo from './components/SplashVideo';
// import { AuthGuard } from "./components/auth/auth-guard";
// import LoginPage from "./components/auth/login-page";

export default function App() {
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

  if (!currentProject) {
    return <ProjectSelector onProjectSelect={handleProjectSelect} />;
  }

  return (
    // <Routes>
    //   {/* <Route path="/" element={<LoginPage />} /> */}
    //   {/* <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} /> */}
    //   {/* <Route path="/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} /> */}
    //   {/* <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} /> */}
    //   <Route path="/" element={<Home />} />
    // </Routes>
    showSplash ? (
      <SplashVideo
        src={getIntroVideoUrl()}
        onFinished={() => setShowSplash(false)}
      />
    ) : (
      <Home />
    )
  );
}