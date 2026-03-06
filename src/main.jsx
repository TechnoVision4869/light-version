import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import SidebarContextProvider from "./store/SidebarContextProvider";
import MainContextProvider from "./store/MainContextProvider.jsx";
import { AuthProvider, AuthConsumer } from "./store/jwt-context.jsx";
import App from "./App.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainContextProvider>
          <SidebarContextProvider>
            <AuthConsumer>
              {(auth) => auth.isInitialized && <App />}
            </AuthConsumer>
          </SidebarContextProvider>
        </MainContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
