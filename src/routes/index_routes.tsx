import { useRoutes } from "react-router-dom";
import { proveedoresRoutes } from "./provider_routes";
import { publicRoutes } from "./public_routes";
import { infoRoutes } from "./info_routes";
import { budgetRoutes } from "./budget_routes";
import { constructorRoutes } from "./constructor_routes";

export const IndexRoutes = () => {
  const element = useRoutes([...proveedoresRoutes, ...publicRoutes, ...infoRoutes, ...budgetRoutes, ...constructorRoutes]);
  return element;
};
