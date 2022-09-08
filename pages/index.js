import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//COMPONENTS
import LandingNavBar from "../components/landig_navbar";
import Banner from "../components/landing_banner";
import Grid from "../components/grid";
import LandingCard from "../components/landing_card";
import CideinContainer from "../components/general_section";
import SmallCard from "../components/small_card";
import CideinFooter from "../components/cidein_footer";
//INFO
import CardsInfo from "../assets/info_json/cards.json";
import CardsCliente from "../assets/info_json/client_options.json";
import CardsContractor from "../assets/info_json/contractor_options.json";
import CardsProvider from "../assets/info_json/provider_options.json";
function Home() {
    return (_jsxs(_Fragment, { children: [_jsx(LandingNavBar, {}), _jsx(Banner, {}), _jsx(Grid, Object.assign({ columns: "3", gap: { sm: "0", md: "0", lg: "0" } }, { children: CardsInfo.map((cardInfo) => {
                    return (_jsx(LandingCard, { title: cardInfo.title, icon: cardInfo.icon, description: cardInfo.description, theme: cardInfo.theme }, cardInfo.title));
                }) })), _jsxs(CideinContainer, { children: [_jsxs("h5", Object.assign({ className: "my_sm_16" }, { children: ["\u00BFEres un ", _jsx("strong", { children: "cliente" }), "? - \u00BFQu\u00E9 tipo de proyecto quieres empezar?"] })), _jsx(Grid, Object.assign({ columns: "6", gap: { sm: "12", md: "0", lg: "0" } }, { children: CardsCliente.map((cardInfo) => (_jsx(SmallCard, { title: cardInfo.name, icon: cardInfo.icon, theme: "secondary_theme" }, cardInfo.name))) }))] }), _jsxs(CideinContainer, { children: [_jsxs("h5", Object.assign({ className: "my_sm_16" }, { children: ["\u00BFEres un ", _jsx("strong", { children: "contratista" }), "? - Descubre las herramientas que tenemos para t\u00ED."] })), _jsx(Grid, Object.assign({ columns: "6", gap: { sm: "12", md: "0", lg: "0" } }, { children: CardsContractor.map((cardInfo) => (_jsx(SmallCard, { title: cardInfo.name, icon: cardInfo.icon, theme: "secondary_theme" }, cardInfo.name))) }))] }), _jsxs(CideinContainer, { children: [_jsxs("h5", Object.assign({ className: "my_sm_16" }, { children: ["\u00BFEres un ", _jsx("strong", { children: "Proveedor" }), "? - Publica tus productos y permite a toda la comunidad de constru\u00EDmos tener acceso a ellos."] })), _jsx(Grid, Object.assign({ columns: "6", gap: { sm: "12", md: "0", lg: "0" } }, { children: CardsProvider.map((cardInfo) => (_jsx(SmallCard, { title: cardInfo.name, icon: cardInfo.icon, theme: "secondary_theme" }, cardInfo.name))) }))] }), _jsx(CideinFooter, {})] }));
}
export default Home;
