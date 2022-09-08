import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Pill({ name, icon }) {
    return (_jsxs("div", Object.assign({ className: "pill" }, { children: [_jsx("span", Object.assign({ className: "material-symbols-outlined" }, { children: icon })), _jsx("p", { children: name })] })));
}
export default Pill;
