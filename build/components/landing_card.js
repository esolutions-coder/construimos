import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../types";
function LandingCard({ icon, title, description, theme }) {
    return (_jsxs("div", Object.assign({ className: `landing_card_body ${theme}` }, { children: [_jsx("div", Object.assign({ className: "landing_card_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined" }, { children: icon })) })), _jsxs("div", Object.assign({ className: "landing_card_info" }, { children: [_jsx("div", Object.assign({ className: "landing_card_title" }, { children: _jsx("h6", { children: title }) })), _jsx("div", Object.assign({ className: "landing_card_text" }, { children: description }))] }))] })));
}
export default LandingCard;
