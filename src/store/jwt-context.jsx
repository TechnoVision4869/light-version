import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { apiService } from "../services/api.service";

const ActionType = {
  INITIALIZE: "INITIALIZE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  [ActionType.INITIALIZE]: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  [ActionType.LOGIN]: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  [ActionType.LOGOUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
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
        // Restore token from localStorage if available
        const storedUser = localStorage.getItem("user");

        if ( storedUser) {
          // Token exists, restore it
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: JSON.parse(storedUser),
            },
          });
        } else {
          // No stored session, initialize as unauthenticated
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        // Clear invalid stored data
        localStorage.removeItem("user");
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }) => {
    const response = await authApi.login({ email, password });
    console.log(response);
  
    if (response && response.user) {
      const { access_token, user } = response;
      
      // Store token in apiService (adds Authorization header to all requests)
      apiService.setToken(access_token);
      
      // Store token in localStorage for persistence across page reloads
      localStorage.setItem("user", JSON.stringify(user));
      
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          user: user,
          isAuthenticated: true,
        },
      });

      navigate("/home");
    }
  };

 
  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("user");
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
