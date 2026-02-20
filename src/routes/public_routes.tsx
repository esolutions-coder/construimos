import { RouteObject } from "react-router-dom";
import Home from "../pages";
import Clientes from "../pages/cliente";
import Proveedores from "../pages/proveedores";
import Contratista from "../pages/contratista";
import Login from "../pages/login";
import Register from "../pages/register";
import ProviderSection from "../pages/proveedotes";

export const publicRoutes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/cliente", element: <Clientes /> },
  { path: "/proveedores", element: <Proveedores /> },
  { path: "/contratista", element: <Contratista /> },
  { path: "/provider", element: <ProviderSection /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];
