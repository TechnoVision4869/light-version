import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import SidebarContextProvider from "./store/SidebarContextProvider";
import MainContextProvider from "./store/MainContextProvider.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </MainContextProvider>
  </StrictMode>,
);
