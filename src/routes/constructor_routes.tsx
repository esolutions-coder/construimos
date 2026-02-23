import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../pages/protectedRoute";
import ShowRoom from "../pages/showroom";
import AUTHORIZATION from "../settings/authorized.json";
import ConstructorDetalle from "../components/ConstructorDetalle";

export const constructorRoutes: RouteObject[] = [
  {
    path: "/showroom",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}>
        <ShowRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/constructores/:id",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}>
        <ConstructorDetalle />
      </ProtectedRoute>
    ),
  },
];
