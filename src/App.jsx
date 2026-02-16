import { useContext, useState } from "react";
import Home from "./components/Home";
import SplashVideo from "./components/SplashVideo";
import ProjectSelector from "./components/ProjectSelector";
import { DATA } from "./data/layers";
import { SidebarContext } from "./store/SidebarContextProvider";

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