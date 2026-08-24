import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { apiService } from "../services/api.service";
import { APP_CONFIG } from "../config/appConfig";
import { preloadDeveloperBackground } from "../lib/preloadDeveloperBackground";
import { ROLES } from "../constants/roles";
import { PROJECT_STORAGE_KEY, DEVELOPER_STORAGE_KEY } from "../constants/storageKeys";

const ActionType = {
  INITIALIZE: "INITIALIZE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  accessToken: null, // Add accessToken to state
};

const handlers = {
  [ActionType.INITIALIZE]: (state, action) => {
    const { isAuthenticated, user, accessToken } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      accessToken,
    };
  },

  [ActionType.LOGIN]: (state, action) => {
    const { user, accessToken } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      accessToken,
    };
  },

  [ActionType.LOGOUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedAuth = localStorage.getItem("auth"); // Changed key from "user" to "auth" for clarity

        if (storedAuth) {
          const { user, access_token } = JSON.parse(storedAuth);

          if (access_token && user) {
            apiService.setToken(access_token); // Re-apply token to apiService
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: true,
                user,
                accessToken: access_token,
              },
            });
          } else {
            // Data in localStorage is incomplete or invalid
            localStorage.removeItem("auth");
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: false,
                user: null,
                accessToken: null,
              },
            });
          }
        } else {
          // No stored session, initialize as unauthenticated
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
              accessToken: null,
            },
          });
        }
      } catch (err) {
        console.error("Failed to initialize auth from localStorage:", err);
        localStorage.removeItem("auth"); // Clear potentially corrupted data
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            accessToken: null,
          },
        });
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem("auth");
      apiService.unsetToken();
      dispatch({ type: ActionType.LOGOUT });
      navigate("/login");
    };
    apiService.setOnUnauthorized(handleUnauthorized);
    return () => apiService.setOnUnauthorized(null);
  }, [navigate]);

  const login = async ({ email, password }) => {
    const response = await authApi.login({ email, password });

    if (response && response.user && response.access_token) {
      // Ensure access_token is present
      const { access_token, user } = response;

      apiService.setToken(access_token); // Store token in apiService

      // Store both user and access_token for persistence
      localStorage.setItem("auth", JSON.stringify({ user, access_token }));

      dispatch({
        type: ActionType.LOGIN, // Changed from INITIALIZE to LOGIN action
        payload: {
          user,
          accessToken: access_token,
        },
      });

      // Developer-scoped roles already know their developerId at login — persist it
      // immediately rather than waiting for a project to be selected. Roles that pick a
      // developer at runtime (admin/system_admin/system_technician) store it on selection
      // instead, in SelectionFlow.jsx.
      const developerRoles = [ROLES.DEVELOPER_ADMIN, ROLES.DEVELOPER_MARKETING, ROLES.DEVELOPER_SALES];
      if (user?.developerId && developerRoles.includes(user.role)) {
        localStorage.setItem(DEVELOPER_STORAGE_KEY, user.developerId);
      }

      if (!APP_CONFIG.USE_STATIC && user?.developerId) {
        await preloadDeveloperBackground(user.developerId);
      }

      navigate("/");
    } else {
      // Handle login failure, e.g., throw an error or display a message
      console.error(
        "Login failed: Invalid response from authApi.login",
        response,
      );
      // You might want to throw an error here or return a status
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    // You might not have an authApi.logout if it's just client-side token invalidation
    // await authApi.logout(); // Uncomment if you have a logout endpoint
    localStorage.removeItem("auth"); // Changed key from "user" to "auth"
    // Cleared here too (not just via clearSelectedProject()) so logout always clears
    // them regardless of call site.
    localStorage.removeItem(PROJECT_STORAGE_KEY);
    localStorage.removeItem(DEVELOPER_STORAGE_KEY);
    apiService.unsetToken();
    dispatch({
      type: ActionType.LOGOUT,
    });

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
