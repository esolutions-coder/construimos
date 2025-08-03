import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
//PAGES
import Home from "../src/pages/index";
import Presupuestos from "./pages/presupuestos";
import AdminApus from "./pages/admin_apus";
import ShowRoom from "./pages/showroom";
import Login from "./pages/login";
import Register from "./pages/register";
import Materials from "./pages/materials";
import MaterialInfo from "./pages/material-info";
import TransportationInfo from "./pages/transportation-info";
import EquipmentInfo from "./pages/equipment-info";
import WorkhandInfo from "./pages/workhand-info";
import ConstructorDetalle from "./components/ConstructorDetalle";
import "../src/assets/styles/_constructord.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/constructores/:nombre" element={<ConstructorDetalle />} />
        <Route path="/showroom" element={<ShowRoom />} />
        <Route path="/" element={<Home />} />
        <Route path="presupuestos" element={<Presupuestos />} />
        <Route path="/admin/apu-editor" element={<AdminApus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/materials" element={<Materials />} />
        <Route path="/material-info/:id" element={<MaterialInfo />} />
        <Route
          path="/transportation-info/:code"
          element={<TransportationInfo />}
        />
        <Route path="/equipment-info/:code" element={<EquipmentInfo />} />
        <Route path="/workhand-info/:code" element={<WorkhandInfo />} />
      </Routes>
    </div>
  );
}

export default App;
