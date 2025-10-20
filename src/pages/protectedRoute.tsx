import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../customHooks/auth/useAuth";

type RoleManagement<T> =  T & {
  roles?: string[]
}

export const ProtectedRoute = ({ children, roles }: RoleManagement<PropsWithChildren>) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  if(!roles?.includes(user.role)){
    return <Navigate to="/unauthorized"/>
  }

 return <>{children}</>;
};