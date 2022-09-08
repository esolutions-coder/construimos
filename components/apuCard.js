import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Formatter from "../utils/formatter";
function ApuCard({ apuInfo, addSubActivity, setTab, visualizeExternalAPU, }) {
    const setTabAndShowAPU = () => {
        setTab(false);
        visualizeExternalAPU(apuInfo.apu_id);
    };
    return (_jsxs("div", Object.assign({ className: "apu_card" }, { children: [_jsxs("div", Object.assign({ className: "apu_card_body" }, { children: [_jsx("p", Object.assign({ className: "apu_card_title" }, { children: apuInfo.apu_name })), _jsx("p", Object.assign({ className: "apu_card_description" }, { children: apuInfo.apu_description })), _jsxs("p", Object.assign({ className: "apu_card_description" }, { children: ["Costo: ", Formatter(apuInfo.apu_price)] }))] })), _jsxs("div", Object.assign({ className: "apu_card_actions" }, { children: [_jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => setTabAndShowAPU() }, { children: "visibility" })), _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => addSubActivity(apuInfo) }, { children: "add_box" }))] }))] })));
}
export default ApuCard;
