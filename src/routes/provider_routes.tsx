import { ProtectedRoute } from "../pages/protectedRoute";
import ListWorkhand from "../pages/listworkhand";
import ListTransportation from "../pages/listtransport";
import ListadeEquipo from "../pages/listequipo";
import ProvedorDashboard from "../pages/provdashboard";
import AUTHORIZATION from "../settings/authorized.json";
import Materials from "../pages/materials";
import ListaProveedores from "../pages/listproveedores";
import AdminApus from "../pages/admin_apus";
import { RouteObject } from "react-router-dom";

export const proveedoresRoutes: RouteObject[] = [
  {
    path: "/manodeobraprovider/list",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.PROVIDER}>
        {" "}
        <ListWorkhand />
      </ProtectedRoute>
    ),
  },

  {
    path: "/transporteprovider/list",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.PROVIDER}>
        {" "}
        <ListTransportation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/equipoprovider/list",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.PROVIDER}>
        {" "}
        <ListadeEquipo />
      </ProtectedRoute>
    ),
  },
  { path: "/provider/materials", element: <Materials /> },
  {
    path: "/materialesprovider/list",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.PROVIDER}>
        {" "}
        <ListaProveedores />
      </ProtectedRoute>
    ),
  },
  { path: "/admin/apu-editor", element: <AdminApus /> },
  {
    path: "/provdashboard",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.PROVIDER}>
        <ProvedorDashboard />
      </ProtectedRoute>
    ),
  },
];
