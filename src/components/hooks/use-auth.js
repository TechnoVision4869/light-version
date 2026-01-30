import { useContext } from "react";
import { AuthContext } from "../../store/jwt-context";

export const useAuth = () => useContext(AuthContext);
