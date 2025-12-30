import { Route, Routes } from "react-router-dom";
//PAGES
import "react-icons/io5";
import Home from "../src/pages/index";
import ConstructorDetalle from "./components/ConstructorDetalle";
import AdminApus from "./pages/admin_apus";
import Cliente from "./pages/cliente";
import Contratista from "./pages/contratista";
import CrearPro from "./pages/crearnewpro";
import Dashboard from "./pages/dashboard";
import EquipmentInfo from "./pages/equipment-info";
import Login from "./pages/login";
import MaterialById from "./pages/material";
import Materials from "./pages/materials";
import Presupuestos from "./pages/presupuestos";
import {
  default as Proveedores,
  default as ProviderSection,
} from "./pages/proveedores";
import Register from "./pages/register";
import ShowRoom from "./pages/showroom";
import TransportationInfo from "./pages/transportation-info";
import WorkhandInfo from "./pages/workhand-info";
import { AuthProvider } from "./customHooks/auth/useAuth";
import { ProtectedRoute } from "./pages/protectedRoute";
import AUTHORIZATION from "./settings/authorized.json";
import PresupuestosEditor from "./pages/budgets/pages/presupuestos-editor";
import ListPresupuestos from "./pages/listpresupuestos";
import { BudgetProvider } from "./pages/budgets/context/budgetContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/constructores/:nombre" element={<ProtectedRoute roles={AUTHORIZATION.CONSTRUCTORES}><ConstructorDetalle /></ProtectedRoute>} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="presupuestos" element={<Presupuestos />} />
        <Route path="/crearnuevoproducto" element={<CrearPro />} />
        <Route path="/contratista" element={<Contratista />} />
        <Route path="/provider" element={<ProviderSection />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/showroom" element={<ShowRoom />} />
        <Route path="/" element={<Home />} />
        <Route path="/presupuestos/pill/:slug" element={<BudgetProvider><Presupuestos /></BudgetProvider>} />
        <Route path="/presupuestos/pill/:slug/id/:projectId" element={<BudgetProvider><PresupuestosEditor /></BudgetProvider>} />
        <Route path="/admin/apu-editor" element={<AdminApus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/materials" element={<Materials />} />
        <Route path="/material/info/:materialId" element={<MaterialById />} />
        <Route
          path="/transportation/info/:code"
          element={<TransportationInfo />}
        />
        <Route path="/equipment/info/:code" element={<EquipmentInfo />} />
        <Route path="/workhand/info/:code" element={<WorkhandInfo />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
