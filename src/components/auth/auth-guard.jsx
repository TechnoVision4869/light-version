import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.isInitialized) {
      // Store the return URL for after login
      sessionStorage.setItem("authReturnUrl", location.pathname + location.search);
      navigate("/");
    } else if (auth.isAuthenticated && auth.isInitialized) {
      setChecked(true);
    }
  }, [auth.isAuthenticated, auth.isInitialized, navigate, location]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
