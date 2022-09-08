import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//IMAGES
import BannerImage from "../assets/img/banner_1.png";
function Banner() {
    return (_jsxs("div", Object.assign({ id: "banner" }, { children: [_jsx("img", { src: BannerImage, alt: "" }), _jsxs("div", Object.assign({ id: "over_banner_info" }, { children: [_jsx("h4", Object.assign({ className: "txt_white" }, { children: "Soy un cliente" })), _jsx("p", Object.assign({ className: "txt_white" }, { children: "Los clientes son las personas que quieren desarrollar un proyecto y necesitan de profesionales para llevarlos a cabo" })), _jsx("button", Object.assign({ className: "btn primary_theme" }, { children: "Registrarme como cliente" }))] }))] })));
}
export default Banner;
