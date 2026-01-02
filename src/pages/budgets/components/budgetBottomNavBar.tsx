import { useState } from "react";
import CideinProject from "../../../utils/project_constructor";
import CideinWarning from "../../../components/warning";
import Modal from "../../../components/layout/modal";
import AddMaterialForm from "../forms/addMaterialForm";
import AddEquipmentForm from "../forms/addEquipmentForm";
import AddWorkhandForm from "../forms/addWorkhandForm";
import AddTransportationForm from "../forms/addTransportationForm";
import { useBudgetContext } from "../context/budgetContext";

type BudgetBottomNavBarProps = {
  setProjectInfo: (value: React.SetStateAction<CIDEINProject>) => void;
  projectInfo: CIDEINProject;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  saveProject: () => void;
};

export default function BudgetBottomNavBar({ setProjectInfo, projectInfo, setActiveTab, saveProject }: BudgetBottomNavBarProps) {
  const { currentProject } = useBudgetContext();

  //Show or hide general config menu
  const [configMenu, setConfigMenu] = useState(true);
  const [addThingsMenu, setAddThingsMenu] = useState(true);
  const [addMaterialModal, setAddMaterialModal] = useState(false);
  const [addEquipmentModal, setAddEquipmentModal] = useState(false);
  const [addWorkhandModal, setAddWorkhandModal] = useState(false);
  const [addTransportationModal, setAddTransportationModal] = useState(false);

  const editIva = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateIva(newIva);
    setProjectInfo(currentProject.state);
  };

  const editAdmin = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateAdmin(newIva);
    setProjectInfo(currentProject.state);
  };

  const editUnforeseen = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateUnforeseen(newIva);
    setProjectInfo(currentProject.state);
  };

  const editUtility = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateUtility(newIva);
    setProjectInfo(currentProject.state);
  };

  const addActivity = () => {
    const activity_mock = {
      activity_id: Date.now().toString(),
      activity_name: "NUEVA ACTIVIDAD",
      subActivities: [],
      subtotal_activity: 0,
    };

    currentProject.addActivity(activity_mock);
    setProjectInfo(currentProject.state);
  };
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "La APU se ha creado correctamente",
    color: "primary_theme",
    icon: "info",
  });

  const helpfulAlert = (message: string, color: string, time: number, icon: string) => {
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

  const addThings = (data: CIDEINMaterials | CIDEINEquipment | CIDEINWorkhand | CIDEINTransportation, type: string) => {
    if (type === "material") {
      currentProject.addMaterial(data as CIDEINMaterials);
      console.log(currentProject);
    } else if (type === "equipment") {
      currentProject.addEquipment(data as CIDEINEquipment);
    } else if (type === "workhand") {
      currentProject.addWorkhand(data as CIDEINWorkhand);
    } else if (type === "transportation") {
      currentProject.addTransportation(data as CIDEINTransportation);
    }
    setProjectInfo(currentProject.state);
  };

  return (
    <>
      {/* Modal: Add Materials */}
      <Modal modal={addMaterialModal} setModal={setAddMaterialModal}>
        <AddMaterialForm handleSave={addThings} />
      </Modal>
      {/* End of Modal: Add Materials */}

      {/* Modal: Add Equipment */}
      <Modal modal={addEquipmentModal} setModal={setAddEquipmentModal}>
        <AddEquipmentForm handleSave={addThings} />
      </Modal>
      {/* End of Modal: Add Equipment */}

      {/* Modal: Add Workhand */}
      <Modal modal={addWorkhandModal} setModal={setAddWorkhandModal}>
        <AddWorkhandForm handleSave={addThings} />
      </Modal>
      {/* End of Modal: Add Workhand */}

      {/* Modal: Add Transportation */}
      <Modal modal={addTransportationModal} setModal={setAddTransportationModal}>
        <AddTransportationForm handleSave={addThings} />
      </Modal>
      {/* End of Modal: Add Transportation */}

      <div className="bottom_options_nav">
        <div className="bottom_nav_container">
          {/* Add Things Menu */}
          <div className={`project_general_config_menu ${addThingsMenu ? "hide" : ""}`}>
            <div
              className="config_field yellow_bg_hover"
              onClick={() => {
                setAddMaterialModal(true);
              }}
            >
              <div className="config_name">
                <p className="caption">MATERIALES</p>
              </div>
            </div>
            <div
              className="config_field yellow_bg_hover"
              onClick={() => {
                setAddEquipmentModal(true);
              }}
            >
              <div className="config_name">
                <p className="caption">EQUIPOS</p>
              </div>
            </div>
            <div
              className="config_field yellow_bg_hover"
              onClick={() => {
                setAddWorkhandModal(true);
              }}
            >
              <div className="config_name">
                <p className="caption">MANO DE OBRA</p>
              </div>
            </div>
            <div
              className="config_field yellow_bg_hover"
              onClick={() => {
                setAddTransportationModal(true);
              }}
            >
              <div className="config_name">
                <p className="caption">TRANSPORTE</p>
              </div>
            </div>
          </div>
          {/* End of Add Things Menu */}
          {/* Edit AIU Menu */}
          <div className={`project_general_config_menu ${configMenu ? "hide" : ""}`}>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IVA(%)</p>
              </div>
              <div className="config_value">
                <input type="number" value={projectInfo.project_config.iva * 100} placeholder="iva" onChange={editIva} />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">ADMINISTRACIÓN(%)</p>
              </div>
              <div className="config_value">
                <input type="number" value={projectInfo.project_config.admin * 100} placeholder="ADMINISTRACIÓN" onChange={editAdmin} />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IMPREVISTOS(%)</p>
              </div>
              <div className="config_value">
                <input type="number" value={projectInfo.project_config.unforeseen * 100} placeholder="IMPREVISTOS" onChange={editUnforeseen} />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">UTILIDAD(%)</p>
              </div>
              <div className="config_value">
                <input type="number" value={projectInfo.project_config.utility * 100} placeholder="utilidad" onChange={editUtility} />
              </div>
            </div>
          </div>
          {/* End of Edit AIU Menu*/}
          <ul>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    setActiveTab("budget");
                  }}
                >
                  hub
                </span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    addActivity();
                    helpfulAlert("Nueva actividad creada correctamente", "success_theme", 5, "check_circle");
                  }}
                >
                  library_add
                </span>
              </div>
            </li>
            <li>
              <CideinWarning
                state={warningProps.warningState}
                message={warningProps.message}
                color={warningProps.color}
                icon={warningProps.icon}
                setWarningProps={setWarningProps}
              />

              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    saveProject();
                    helpfulAlert("APU guardado en el proyecto exitosamente", "success_theme", 5, "check_circle");
                  }}
                >
                  save
                </span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined" onClick={() => setConfigMenu(!configMenu)}>
                  settings
                </span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined" onClick={() => setAddThingsMenu(!addThingsMenu)}>
                  add
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
