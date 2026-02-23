import { useEffect, useState } from "react";
import CideinProject from "../../../utils/project_constructor";
import CideinWarning from "../../../components/warning";
import Modal from "../../../components/layout/modal";
import AddMaterialForm from "../forms/addMaterialForm";
import AddEquipmentForm from "../forms/addEquipmentForm";
import AddWorkhandForm from "../forms/addWorkhandForm";
import AddTransportationForm from "../forms/addTransportationForm";
import { useBudgetContext } from "../context/budgetContext";
import { useNavigate, useParams } from "react-router-dom";

export default function BudgetBottomNavBar() {
  const { currentProject, updateProject, projectInfo, setProjectInfo, setActiveTab, saveNewProject, saveNewProjectData } = useBudgetContext();

  const navigate = useNavigate();

  const {projectId} = useParams();

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
      let fixedData = data as any;
      fixedData._id = Date.now().toString();
      fixedData.material_amount = 0;
      fixedData.material_rud = parseFloat(fixedData.material_rud);
      fixedData.material_unitary_price = parseFloat(fixedData.material_unitary_price);
      currentProject.addMaterial(fixedData);
    } else if (type === "equipment") {
      let fixedData = data as any;
      fixedData._id = Date.now().toString();
      fixedData.equipment_amount = 0;
      fixedData.equipment_rud = parseFloat(fixedData.equipment_rud);
      fixedData.equipment_unitary_price = parseFloat(fixedData.equipment_unitary_price);
      currentProject.addEquipment(fixedData);
    } else if (type === "workhand") {
      let fixedData = data as any;
      fixedData.workHand_amount = 0;
      fixedData._id = Date.now().toString();
      fixedData.workHand_rud = parseFloat(fixedData.workHand_rud);
      fixedData.workHand_unitary_price = parseFloat(fixedData.workHand_unitary_price);
      currentProject.addWorkhand(fixedData);
    } else if (type === "transportation") {
      let fixedData = data as any;
      fixedData._id = Date.now().toString();
      fixedData.transportation_amount = 0;
      fixedData.transportation_rud = parseFloat(fixedData.transportation_rud);
      fixedData.transportation_unitary_price = parseFloat(fixedData.transportation_unitary_price);
      currentProject.addTransportation(fixedData);
    }
    setProjectInfo(currentProject.state);
  };

  const handleSave = () => {
    if(projectId!== "new"){
      updateProject();
    } else {
      saveNewProject();
    }
  };

  useEffect(()=>{
    if(saveNewProjectData.loading){
      helpfulAlert("Guardando presupuesto, esto puede tardar un momento...", "info", 10, "hourglass_top");
    }
    if(saveNewProjectData.data){
      console.log(saveNewProjectData.data)
      navigate(`/presupuestos/pill/create_apus_local/id/${saveNewProjectData.data.addProject.project._id}`);
    }
    if(saveNewProjectData.error){
      helpfulAlert("Error guardando el presupuesto, intenta de nuevo", "error_theme", 5, "error");
    }
  },[saveNewProjectData.data, saveNewProjectData.error, saveNewProjectData.loading])

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
            <div
              className="config_field yellow_bg_hover"
              onClick={() => {
                setAddTransportationModal(true);
              }}
            >
              <div className="config_name">
                <p className="caption">MEMORIA DE CÁLCULO</p>
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
                    setProjectInfo(currentProject.state);
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
                    handleSave()
                    helpfulAlert("APU actualizado en el proyecto exitosamente", "success_theme", 5, "check_circle");
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
