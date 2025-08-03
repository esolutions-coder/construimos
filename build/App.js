import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
//PAGES
import Home from "../src/pages/index";
import Presupuestos from "./pages/presupuestos";
function App() {
    return (_jsx("div", Object.assign({ className: "App" }, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "presupuestos", element: _jsx(Presupuestos, {}) }), _jsx(Route, { path: "/admin/apu-editor", element: _jsx(Presupuestos, {}) })] }) })));
}
export default App;
