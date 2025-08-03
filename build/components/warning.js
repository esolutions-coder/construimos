import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function CideinWarning({ state, message, setWarningProps, color, icon, }) {
    if (state) {
        return (_jsxs("div", Object.assign({ className: `warning ${color}` }, { children: [_jsxs("div", Object.assign({ className: "warning_info" }, { children: [_jsx("div", Object.assign({ className: "warning_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined" }, { children: icon })) })), _jsx("div", Object.assign({ className: "warning_message" }, { children: message }))] })), _jsx("div", Object.assign({ className: "warning_option" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => setWarningProps({
                            warningState: false,
                            message: "Sin mensaje",
                            color: "primary_theme",
                            icon: "info",
                        }) }, { children: "close" })) }))] })));
    }
    else {
        return null;
    }
}
export default CideinWarning;
