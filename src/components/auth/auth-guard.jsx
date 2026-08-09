import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { APP_CONFIG } from "../../config/appConfig";

export const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (APP_CONFIG.USE_STATIC) {
      setChecked(true);
      return;
    }

    if (!auth.isAuthenticated && auth.isInitialized) {
      // Store the return URL for after login
      sessionStorage.setItem(
        "authReturnUrl",
        location.pathname + location.search,
      );
      navigate("/login"); // Corrected: Redirect to login page
    } else {
      setChecked(true); // User is authenticated and initialized, allow content to render
    }
  }, [auth.isAuthenticated, auth.isInitialized]);

  // Render nothing until authentication state has been checked
  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
