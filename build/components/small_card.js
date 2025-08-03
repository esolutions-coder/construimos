import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function SmallCard({ icon, title, theme }) {
    return (_jsxs("div", Object.assign({ className: `smallCard_body ${theme}` }, { children: [_jsx("div", Object.assign({ className: "smallCard_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined" }, { children: icon })) })), _jsx("div", Object.assign({ className: "smallCard_title" }, { children: _jsx("p", { children: title }) }))] })));
}
export default SmallCard;
