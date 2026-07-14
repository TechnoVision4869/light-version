import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { APP_CONFIG } from "./config/appConfig";

import SidebarContextProvider from "./store/SidebarContextProvider";
import MainContextProvider from "./store/MainContextProvider.jsx";
import { AuthProvider, AuthConsumer } from "./store/jwt-context.jsx";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";

// Register Service Worker for offline caching and performance (only when using API, not static data)
if (APP_CONFIG.USE_STATIC && 'serviceWorker' in navigator) {
  // Unregister any previously registered SW when running in static mode
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
} else if (!APP_CONFIG.USE_STATIC && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // Check for updates periodically
      setInterval(() => {
        registration.update().catch(() => {});
      }, 60000); // Check every minute

      // Handle new version available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] New version available. Please refresh to update.');
            // Optional: show toast notification to user
          }
        });
      });
    } catch (error) {
      console.warn('[SW] Registration failed:', error);
    }
  });
}



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
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
);
