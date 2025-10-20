import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

type AuthUser = {
  name: string;
  role: string;
  token: string;
  image: string
  id: string;
};

type UseAuthTypes = {
  user: AuthUser;
  login: Function;
  logout: Function;
};

/* @ts-ignore */
const AuthContext = createContext();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage("construimos", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: any) => {
    setUser(data);
    navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext<UseAuthTypes>(AuthContext as any);
};