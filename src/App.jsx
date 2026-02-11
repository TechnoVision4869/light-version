import { useState } from "react";
import Home from "./components/Home";
import SplashVideo from "./components/SplashVideo";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    showSplash ? (
      <SplashVideo
        src="/kog/videos/home/intro1.mp4"
        onFinished={() => setShowSplash(false)}
      />
    ) : (
      <Home />
    )
  );
}