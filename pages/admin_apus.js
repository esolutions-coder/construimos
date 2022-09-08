import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//GENERAL
import { useEffect, useState } from "react";
//COMPONENTS
import CideinLayOut from "../components/cidein_layout";
//INFO
import Project from "../assets/info_json/project_info.json";
import PillsInfo from "../assets/info_json/pills.json";
import SybActivityMock from "../assets/info_json/subActivityMock.json";
//UTILS
import React from "react";
import CideinProject from "../utils/project_constructor";
import Formatter from "../utils/formatter";
import Pill from "../components/pills";
import ApuCard from "../components/apuCard";
import CideinWarning from "../components/warning";
//APOLLO
import { useQuery } from "@apollo/client";
//QUERIES
import { GET_APUS } from "../assets/apus_queries/allApus";
import SearchBox from "../components/search";
function Presupuestos() {
    const [projectInfo, setProjectInfo] = useState(Project);
    const [activityList, setActivityList] = useState([{ name: "", id: "" }]);
    const [selectedActivity, setSelectedActivity] = useState("");
    const [searchedApus, setSearchedApus] = useState([]);
    const { loading, error, data } = useQuery(GET_APUS);
    //Active tab changes between the cidein_window_1 (true) --> Presupuesto and cidein_window_2 (false)--> Single APU
    const [activeTab, setActiveTab] = useState(true);
    const [warningProps, setWarningProps] = useState({
        warningState: false,
        message: "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
        color: "primary_theme",
        icon: "info",
    });
    //Show or hide general config menu
    const [configMenu, setConfigMenu] = useState(true);
    const project_title = Project.project_title;
    const project_description = Project.project_description;
    const materials = Project.materials;
    const equipment = Project.equipment;
    const workHand = Project.workHand;
    const apus = Project.apus;
    const project_activities = Project.project_activities;
    const budget_prices = Project.budget_prices;
    const project_config = Project.project_config;
    const project_general_info = Project.project_general_info;
    const [selectedApu, setSelectedApu] = useState(SybActivityMock);
    const currentProject = new CideinProject(materials, equipment, workHand, apus, project_activities, budget_prices, project_config, project_general_info);
    useEffect(() => {
        const initializedProject = currentProject.updateProject();
        setActivityList(currentProject.activitiesList());
        setProjectInfo(Object.assign({}, initializedProject));
    }, []);
    const handleSubactivityValue = (evt) => {
        const inputId = evt.target.id;
        const splitInput = inputId.split("+");
        const [propName, activityId, subActivityId] = splitInput;
        let newSubActivityPrice = parseFloat(evt.target.value);
        currentProject.updateSubActivityPrice(activityId, subActivityId, newSubActivityPrice);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const handleSubactivityAmount = (evt) => {
        const inputId = evt.target.id;
        const splitInput = inputId.split("+");
        const [propName, activityId, subActivityId] = splitInput;
        let newSubActivityPrice = parseFloat(evt.target.value);
        currentProject.updateSubActivityAmount(activityId, subActivityId, newSubActivityPrice);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const addSubActivity = (apuInfo) => {
        const analizedApu = currentProject.APUCalculator(apuInfo);
        console.log(analizedApu);
        const newSubActivity = {
            subActivity_apu: Object.assign({}, analizedApu),
            amount: 0,
            subActivity_total: 0,
            subActivity_id: Date.now().toString(),
        };
        newSubActivity.subActivity_total =
            currentProject.subActivityCalculator(newSubActivity);
        if (selectedActivity === "") {
            helpfulAlert("Debes seleccionar una actividad", "primary_theme", 5, "info");
            return;
        }
        else {
            setWarningProps({
                warningState: false,
                message: "",
                color: "primary_theme",
                icon: "info",
            });
            currentProject.addSubActivity(selectedActivity, newSubActivity);
            setProjectInfo(currentProject.updateProject());
        }
    };
    const addActivity = () => {
        const activity_mock = {
            activity_id: Date.now().toString(),
            activity_name: "NUEVA ACTIVIDAD",
            subActivities: [],
            subtotal_activity: 0,
        };
        currentProject.addActivity(activity_mock);
        setActivityList(currentProject.activitiesList());
        setProjectInfo(currentProject.updateProject());
    };
    const handleSelectedActivity = (evt) => {
        const selectedActivity = evt.target.value;
        setSelectedActivity(selectedActivity);
    };
    const changeActivityName = (evt) => {
        const newName = evt.target.value;
        const activityId = evt.target.id;
        currentProject.changeActivityName(activityId, newName);
        setActivityList(currentProject.activitiesList());
    };
    const deleteActivity = (activityId) => {
        const deletedActivity = currentProject.deleteActivity(activityId);
        setActivityList(currentProject.activitiesList());
        helpfulAlert(`Has eliminado la actividad ${deletedActivity[0].activity_name}`, "primary_theme", 3, "info");
    };
    const changeProjectTitle = (evt) => {
        const newTitle = evt.target.value;
        currentProject.updateName(newTitle);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const editDescription = (evt) => {
        const newDescription = evt.target.value;
        currentProject.editDescription(newDescription);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const visualizeExternalAPU = (apuId) => {
        if (searchedApus) {
            const selectedAPU = searchedApus.find((apu) => apu.apu_id === apuId);
            if (selectedAPU) {
                const analizedApu = currentProject.APUCalculator(selectedAPU);
                setSelectedApu(analizedApu);
            }
            else {
                helpfulAlert("No se ha podido seleccionar el apu", "error_theme", 3, "warning");
            }
        }
        else {
            helpfulAlert("Ha ocurrido un error cargando tus datos", "error_theme", 3, "warning");
        }
    };
    const editIva = (evt) => {
        const newIva = parseFloat(evt.target.value) / 100;
        currentProject.updateIva(newIva);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const editAdmin = (evt) => {
        const newIva = parseFloat(evt.target.value) / 100;
        currentProject.updateAdmin(newIva);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const editUnforeseen = (evt) => {
        const newIva = parseFloat(evt.target.value) / 100;
        currentProject.updateUnforeseen(newIva);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const editUtility = (evt) => {
        const newIva = parseFloat(evt.target.value) / 100;
        currentProject.updateUtility(newIva);
        const updateProject = currentProject.updateProject();
        setProjectInfo(updateProject);
    };
    const helpfulAlert = (message, color, time, icon) => {
        setWarningProps({
            message: message,
            warningState: true,
            icon: icon,
            color: color,
        });
        setTimeout(() => {
            setWarningProps({
                message: "Aquí aparecerán tus mensajes",
                warningState: false,
                icon: "info",
                color: "primary_theme",
            });
        }, time * 1000);
    };
    const deleteSubActivity = (activityId, subActivityId) => {
        const removeSubActivity = currentProject.deleteSubActivity(activityId, subActivityId);
        helpfulAlert(`Has eliminado la sub actividad: ${removeSubActivity[0].subActivity_apu.apu_name}`, "primary_theme", 3, "info");
    };
    return (_jsxs(CideinLayOut, { children: [_jsx(CideinWarning, { state: warningProps.warningState, message: warningProps.message, color: warningProps.color, icon: warningProps.icon, setWarningProps: setWarningProps }), _jsxs("div", Object.assign({ className: "grid col_sm_3 gap_sm_12" }, { children: [_jsx("div", Object.assign({ className: "span_sm_2 cidein_window" }, { children: activeTab ? (_jsxs("div", Object.assign({ className: "cidein_window_1" }, { children: [_jsx("input", { type: "text", className: "title_input my_sm_16", onChange: changeProjectTitle, value: projectInfo.project_general_info.name, placeholder: "Nombre del proyecto" }), _jsx("textarea", { name: "description", id: "description", className: "body_1 description_input", onChange: editDescription, value: projectInfo.project_general_info.description }), _jsx("div", Object.assign({ className: "table_container" }, { children: _jsxs("table", Object.assign({ className: "cidein_table" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", Object.assign({ className: "border_top_left" }, { children: "Item" })), _jsx("td", { children: "Descripci\u00F3n de actividad" }), _jsx("td", { children: "Unidad" }), _jsx("td", { children: "Cantidad" }), _jsx("td", { children: "Valor unitario" }), _jsx("td", Object.assign({ className: "border_top_right" }, { children: "Valor Total" }))] }) }), _jsxs("tbody", { children: [projectInfo.project_activities.map((activity, index) => {
                                                        return (_jsxs(React.Fragment, { children: [_jsx("tr", Object.assign({ className: "activity_name" }, { children: _jsx("td", Object.assign({ colSpan: 6 }, { children: _jsxs("div", Object.assign({ className: "activity_header" }, { children: [_jsxs("div", Object.assign({ className: "activity_name_index" }, { children: [_jsx("p", Object.assign({ className: "table_index" }, { children: `${index + 1}` })), _jsx("input", { type: "text", className: "table_name_input", id: activity.activity_id, value: activity.activity_name, onChange: changeActivityName })] })), _jsx("div", Object.assign({ className: "activity_options" }, { children: _jsx("div", Object.assign({ className: "delete_activity" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => deleteActivity(activity.activity_id) }, { children: "delete" })) })) }))] })) })) })), activity.subActivities.map((subActivity, subIndex) => {
                                                                    return (_jsx(React.Fragment, { children: _jsxs("tr", Object.assign({ className: "subActivity_row" }, { children: [_jsx("td", { children: `${index + 1}.${subIndex + 1}` }), _jsx("td", { children: subActivity.subActivity_apu.apu_name }), _jsx("td", { children: subActivity.subActivity_apu.apu_unit }), _jsx("td", { children: _jsx("input", { type: "number", className: "table_input", value: subActivity.amount, onChange: handleSubactivityAmount, id: `amount+${activity.activity_id}+${subActivity.subActivity_id}` }) }), _jsx("td", { children: _jsx("input", { type: "number", className: "table_input", value: subActivity.subActivity_apu.apu_price, onChange: handleSubactivityValue, id: `vu+${activity.activity_id}+${subActivity.subActivity_id}` }) }), _jsx("td", { children: _jsxs("div", Object.assign({ className: "subActivity_options" }, { children: [Formatter(subActivity.subActivity_total), _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => deleteSubActivity(activity.activity_id, subActivity.subActivity_id) }, { children: "cancel" }))] })) })] })) }, subActivity.subActivity_apu.apu_id));
                                                                }), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsx("td", Object.assign({ colSpan: 2 }, { children: "Subtotal Actividad" })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(activity.subtotal_activity) }))] }))] }, activity.activity_id));
                                                    }), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsx("td", Object.assign({ colSpan: 2 }, { children: "Costo Directo" })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.direct_costs) }))] })), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsxs("td", Object.assign({ colSpan: 2 }, { children: ["Administraci\u00F3n (", projectInfo.project_config.ADMIN * 100, "%)"] })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.admin) }))] })), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsxs("td", Object.assign({ colSpan: 2 }, { children: ["Imprevistos (", projectInfo.project_config.UNFORESEEN * 100, "%)"] })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.unforeseen) }))] })), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsxs("td", Object.assign({ colSpan: 2 }, { children: ["Utilidad (", projectInfo.project_config.UTILITY * 100, "%)"] })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.utility) }))] })), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsxs("td", Object.assign({ colSpan: 2 }, { children: ["IVA (", projectInfo.project_config.IVA * 100, "%)"] })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.IVA) }))] })), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsx("td", Object.assign({ colSpan: 2 }, { children: "Valor Total " })), _jsx("td", Object.assign({ colSpan: 4, className: "subtotal_price" }, { children: Formatter(projectInfo.budget_prices.total_cost) }))] }))] })] })) }))] }))) : (_jsxs("div", Object.assign({ className: "cidein_window_2" }, { children: [_jsxs("div", Object.assign({ className: "apu_description my_sm_16" }, { children: [_jsx("h5", { children: selectedApu.apu_name }), _jsx("p", Object.assign({ className: "txt_left body_1" }, { children: selectedApu.apu_description }))] })), _jsx("div", Object.assign({ className: "table_container" }, { children: _jsxs("table", Object.assign({ className: "cidein_table" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", Object.assign({ className: "border_top_left" }, { children: "C\u00F3digo" })), _jsx("td", { children: "Descripci\u00F3n" }), _jsx("td", { children: "Unidad" }), _jsx("td", { children: "Cantidad" }), _jsx("td", { children: "Valor unitario" }), _jsx("td", { children: "RUD" }), _jsx("td", Object.assign({ className: "border_top_right" }, { children: "Valor parcial" }))] }) }), _jsxs("tbody", { children: [selectedApu.apu_materials.map((material, index) => {
                                                        return (_jsxs("tr", Object.assign({ className: "subActivity_row" }, { children: [_jsx("td", { children: material.material_code }), _jsx("td", { children: material.material_name }), _jsx("td", { children: material.material_unit }), _jsx("td", { children: material.material_amount }), _jsx("td", { children: Formatter(material.material_unitary_price) }), _jsx("td", { children: material.material_rud }), _jsx("td", { children: Formatter(material.material_partial_value) })] }), index));
                                                    }), selectedApu.apu_equipment.map((equipment, index) => {
                                                        return (_jsxs("tr", Object.assign({ className: "subActivity_row" }, { children: [_jsx("td", { children: equipment.equipment_code }), _jsx("td", { children: equipment.equipment_name }), _jsx("td", { children: equipment.equipment_unit }), _jsx("td", { children: equipment.equipment_amount }), _jsx("td", { children: Formatter(equipment.equipment_unitary_price) }), _jsx("td", { children: equipment.equipment_rud }), _jsx("td", { children: Formatter(equipment.equipment_partial_value) })] }), index));
                                                    }), selectedApu.apu_workHand.map((workHand, index) => {
                                                        return (_jsxs("tr", Object.assign({ className: "subActivity_row" }, { children: [_jsx("td", { children: workHand.workHand_code }), _jsx("td", { children: workHand.workHand_name }), _jsx("td", { children: workHand.workHand_unit }), _jsx("td", { children: workHand.workHand_amount }), _jsx("td", { children: Formatter(workHand.workHand_unitary_price) }), _jsx("td", { children: workHand.workHand_rud }), _jsx("td", { children: Formatter(workHand.workHand_partial_value) })] }), index));
                                                    }), _jsxs("tr", Object.assign({ className: "subtotal_activity" }, { children: [_jsx("td", Object.assign({ colSpan: 2 }, { children: "Subtotal APU" })), _jsx("td", Object.assign({ colSpan: 5, className: "subtotal_price" }, { children: Formatter(selectedApu.apu_price) }))] }))] })] })) }))] }))) })), _jsxs("div", Object.assign({ className: "span_sm_1" }, { children: [_jsx("div", Object.assign({ className: "grid col_sm_2 gap_sm_12 my_sm_16" }, { children: PillsInfo.map((pill, index) => (_jsx(Pill, { name: pill.name, icon: pill.icon }, index))) })), _jsxs("div", Object.assign({ className: "pill_selection_container" }, { children: [_jsxs("div", Object.assign({ className: "activity_selector_nav" }, { children: [_jsx("h5", { children: "APUS" }), _jsxs("select", Object.assign({ name: "activity", id: "activity", onChange: handleSelectedActivity }, { children: [_jsx("option", Object.assign({ value: "" }, { children: "SELECCIONE ACTIVIDAD" })), activityList.map((activity) => (_jsx("option", Object.assign({ id: activity.id, value: activity.id }, { children: activity.name }), activity.id)))] }))] })), _jsx(SearchBox, { setSearchedApus: setSearchedApus }), _jsx("div", Object.assign({ className: "results_container" }, { children: searchedApus.length === 0 ? (_jsx("p", { children: "No hemos encontrado lo que buscabas..." })) : (searchedApus.map((apu) => {
                                            return (_jsx(ApuCard, { apuInfo: Object.assign({}, apu), addSubActivity: addSubActivity, setTab: setActiveTab, visualizeExternalAPU: visualizeExternalAPU }, apu.apu_id));
                                        })) }))] }))] }))] })), _jsx("div", Object.assign({ className: "bottom_options_nav" }, { children: _jsxs("div", Object.assign({ className: "bottom_nav_container" }, { children: [_jsxs("div", Object.assign({ className: `project_general_config_menu ${configMenu ? "hide" : ""}` }, { children: [_jsxs("div", Object.assign({ className: "config_field" }, { children: [_jsx("div", Object.assign({ className: "config_name" }, { children: _jsx("p", Object.assign({ className: "caption" }, { children: "IVA(%)" })) })), _jsx("div", Object.assign({ className: "config_value" }, { children: _jsx("input", { type: "number", value: projectInfo.project_config.IVA * 100, placeholder: "iva", onChange: editIva }) }))] })), _jsxs("div", Object.assign({ className: "config_field" }, { children: [_jsx("div", Object.assign({ className: "config_name" }, { children: _jsx("p", Object.assign({ className: "caption" }, { children: "ADMINISTRACI\u00D3N(%)" })) })), _jsx("div", Object.assign({ className: "config_value" }, { children: _jsx("input", { type: "number", value: projectInfo.project_config.ADMIN * 100, placeholder: "ADMINISTRACI\u00D3N", onChange: editAdmin }) }))] })), _jsxs("div", Object.assign({ className: "config_field" }, { children: [_jsx("div", Object.assign({ className: "config_name" }, { children: _jsx("p", Object.assign({ className: "caption" }, { children: "IMPREVISTOS(%)" })) })), _jsx("div", Object.assign({ className: "config_value" }, { children: _jsx("input", { type: "number", value: projectInfo.project_config.UNFORESEEN * 100, placeholder: "IMPREVISTOS", onChange: editUnforeseen }) }))] })), _jsxs("div", Object.assign({ className: "config_field" }, { children: [_jsx("div", Object.assign({ className: "config_name" }, { children: _jsx("p", Object.assign({ className: "caption" }, { children: "UTILIDAD(%)" })) })), _jsx("div", Object.assign({ className: "config_value" }, { children: _jsx("input", { type: "number", value: projectInfo.project_config.UTILITY * 100, placeholder: "utilidad", onChange: editUtility }) }))] }))] })), _jsxs("ul", { children: [_jsx("li", { children: _jsx("div", Object.assign({ className: "bottom_nav_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => setActiveTab(true) }, { children: "hub" })) })) }), _jsx("li", { children: _jsx("div", Object.assign({ className: "bottom_nav_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => addActivity() }, { children: "library_add" })) })) }), _jsx("li", { children: _jsx("div", Object.assign({ className: "bottom_nav_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined" }, { children: "save" })) })) }), _jsx("li", { children: _jsx("div", Object.assign({ className: "bottom_nav_icon" }, { children: _jsx("span", Object.assign({ className: "material-symbols-outlined", onClick: () => setConfigMenu(!configMenu) }, { children: "settings" })) })) })] })] })) }))] }));
}
export default Presupuestos;
