import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
function QueryResult({ loading, error, data, children, }) {
    if (error) {
        return _jsxs("p", { children: ["ERROR: ", error.message] });
    }
    if (loading) {
        return _jsx("p", { children: "Cargando APUS..." });
    }
    if (!data) {
        return _jsx("p", { children: "No hay nada que mostrar" });
    }
    if (data) {
        return _jsx(_Fragment, { children: children });
    }
    return _jsx("p", { children: "Algo sucedi\u00F3" });
}
export default QueryResult;
