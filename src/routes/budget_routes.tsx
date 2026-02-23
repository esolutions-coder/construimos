import { RouteObject } from "react-router-dom";
import { BudgetProvider } from "../pages/budgets/context/budgetContext";
import Presupuestos from "../pages/presupuestos";
import { ProtectedRoute } from "../pages/protectedRoute";
import AUTHORIZATION from "../settings/authorized.json";
import ListPresupuestos from "../pages/listpresupuestos";
import PresupuestosEditor from "../pages/budgets/pages/presupuestos-editor";

export const budgetRoutes: RouteObject[] = [
  {
    path: "/presupuestos/pill/:slug",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}>
        <BudgetProvider>
          <Presupuestos />
        </BudgetProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/presupuestos",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}>
        <BudgetProvider>
          <Presupuestos />
        </BudgetProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/presupuestos/pill/:slug/id/:projectId",
    element: (
      <BudgetProvider>
        <PresupuestosEditor />
      </BudgetProvider>
    ),
  },
  {
    path: "/presupuestos/list",
    element: (
      <ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}>
        {" "}
        <ListPresupuestos />
      </ProtectedRoute>
    ),
  },
];
