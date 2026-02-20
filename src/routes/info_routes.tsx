import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import CrearPro from "../pages/crearnewpro";
import MaterialById from "../pages/material";
import TransportationInfo from "../pages/transportation-info";
import EquipmentInfo from "../pages/equipment-info";
import WorkhandInfo from "../pages/workhand-info";

export const infoRoutes: RouteObject[] = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/crearnuevoproducto", element: <CrearPro /> },
  { path: "/material/info/:materialId", element: <MaterialById /> },
  { path: "/transportation/info/:code", element: <TransportationInfo /> },
  { path: "/equipment/info/:code", element: <EquipmentInfo /> },
  { path: "/workhand/info/:code", element: <WorkhandInfo /> },
];
