import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

type Role = "ADMIN" | "VISITOR" | "CONTRATISTA" | "PROVIDER" | "SOPORTE";

type AuthUser = {
  _id: string;
  username: string;
  role: Role;
  token: string;
  image?: string;
  password?: string;
  creationDate?: string;
  nit?: string;
  email?: string;
  location?: string;
};

type UseAuthTypes = {
  user: AuthUser | null;
  login: (data: AuthUser) => Promise<void> | void;
  logout: () => void;
};

const AuthContext = createContext<UseAuthTypes | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<AuthUser | null>("construimos", null);
  const navigate = useNavigate();

  const login: UseAuthTypes["login"] = async (data) => {
    setUser(data);

    if (data.role === "PROVIDER") {
      navigate("/provdashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const logout: UseAuthTypes["logout"] = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
};
