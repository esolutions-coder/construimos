//GENERAL
import { useEffect, useState } from "react";

//COMPONENTS
import CideinLayOut from "../components/cidein_layout";

//INFO
import Project from "../assets/info_json/project_info.json";
import PillsInfo from "../assets/info_json/pills.json";
import SubActivityMock from "../assets/info_json/subActivityMock.json";

//UTILS
import React from "react";
import CideinProject from "../utils/project_constructor";
import Formatter from "../utils/formatter";
import Pill from "../components/pills";
import ApuCard from "../components/apuCard";
import CideinWarning from "../components/warning";

//APOLLO
import { useQuery, useLazyQuery } from "@apollo/client";
import QueryResult from "../components/QueryResult";

//QUERIES
import SearchBox from "../components/search";
import BudgetPills from "../components/budget_pills";
import { GET_FULL_APU_BY_ID } from "../assets/apus_queries/allApus";
import useApu from "../utils/useApu";

const materials = Project.materials;
const equipment = Project.equipment;
const workHand = Project.workHand;
const apus = Project.apus;
const project_activities = Project.project_activities;
const budget_prices = Project.budget_prices;
const project_config = Project.project_config;
const project_general_info = Project.project_general_info;

const currentProject = new CideinProject(
  materials,
  equipment,
  workHand,
  apus,
  project_activities,
  budget_prices,
  project_config,
  project_general_info
);

function Presupuestos() {
  const [projectInfo, setProjectInfo] = useState<CIDEINProject>(Project);
  const [activityList, setActivityList] = useState([{ name: "", id: "" }]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchedApus, setSearchedApus] = useState<APU[]>([]);

  //Active tab changes between the cidein_window_1 (true) --> Presupuesto and cidein_window_2 (false)--> Single APU
  const [activeTab, setActiveTab] = useState(true);
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message:
      "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
    color: "primary_theme",
    icon: "info",
  });
  //Show or hide general config menu
  const [configMenu, setConfigMenu] = useState(true);
  const subAct = SubActivityMock as APU;
  const [selectedApu, setSelectedApu] = useState(subAct);
  //Search the full info of the selected APU
  const [getFullApu, GetFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
  //Add the full info of the selected APU
  const [addFullApu, addFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
  //AddSubactivity
  const [addSubCounter, setAddSubCounter] = useState(true);

  useEffect(() => {
    const initializedProject = currentProject.updateProject();
    setActivityList(currentProject.activitiesList());
    setProjectInfo({ ...initializedProject });
  }, []);

  const handleSubactivityValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = evt.target.id;
    const splitInput = inputId.split("+");
    const [propName, activityId, subActivityId] = splitInput;
    let newSubActivityPrice = parseFloat(evt.target.value);

    currentProject.updateSubActivityPrice(
      activityId,
      subActivityId,
      newSubActivityPrice
    );
    const updateProject = currentProject.updateProject();
    setProjectInfo(updateProject);
  };

  const handleSubactivityAmount = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputId = evt.target.id;
    const splitInput = inputId.split("+");
    const [propName, activityId, subActivityId] = splitInput;
    let newSubActivityPrice = parseFloat(evt.target.value);

    currentProject.updateSubActivityAmount(
      activityId,
      subActivityId,
      newSubActivityPrice
    );
    const updateProject = currentProject.updateProject();
    setProjectInfo(updateProject);
  };

  useEffect(() => {
    if (addFullApuResponse.data) {
      const analizedApu = currentProject.APUCalculator(
        addFullApuResponse.data.apu
      );

      const newSubActivity: SubActivities = {
        subActivity_apu: { ...analizedApu },
        amount: 0,
        subActivity_total: 0,
        subActivity_id: Date.now().toString(),
      };

      newSubActivity.subActivity_total =
        currentProject.subActivityCalculator(newSubActivity);

      if (selectedActivity === "") {
        helpfulAlert(
          "Debes seleccionar una actividad",
          "primary_theme",
          5,
          "info"
        );
        return;
      } else {
        setWarningProps({
          warningState: false,
          message: "",
          color: "primary_theme",
          icon: "info",
        });

        currentProject.addSubActivity(selectedActivity, newSubActivity);
        setProjectInfo(currentProject.realUpdate());
      }
    }
  }, [addFullApuResponse.data, addSubCounter]);

  const addSubActivity = async (apuId: string) => {
    if (selectedActivity !== "") {
      helpfulAlert(
        "Añadiendo actividad, por favor espere...",
        "success_theme",
        5,
        "add_task"
      );
      setAddSubCounter(!addSubCounter);
      addFullApu({
        variables: {
          apuId,
        },
      });
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

  const handleSelectedActivity = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedActivity = evt.target.value;
    setSelectedActivity(selectedActivity);
  };

  const changeActivityName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newName = evt.target.value;
    const activityId = evt.target.id;
    currentProject.changeActivityName(activityId, newName);
    setProjectInfo(currentProject.realUpdate());
    setActivityList(currentProject.activitiesList());
  };

  const deleteActivity = (activityId: string) => {
    const deletedActivity = currentProject.deleteActivity(activityId);
    setActivityList(currentProject.activitiesList());
    helpfulAlert(
      `Has eliminado la actividad ${deletedActivity[0].activity_name}`,
      "primary_theme",
      3,
      "info"
    );
  };

  const changeProjectTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = evt.target.value;
    currentProject.title = newTitle;
    setProjectInfo(currentProject.fullProject);
  };

  const editDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = evt.target.value;
    currentProject.description = newDescription;
    setProjectInfo(currentProject.fullProject);
  };

  //Cargar data del apu seleccionado una vez el estado de data cambie
  useEffect(() => {
    if (GetFullApuResponse.data) {
      const analizedApu = currentProject.APUCalculator(
        GetFullApuResponse.data.apu
      );
      setSelectedApu(analizedApu);
    }
  }, [GetFullApuResponse.data]);

  const visualizeExternalAPU = (apuId: string) => {
    getFullApu({
      variables: {
        apuId,
      },
    });
  };

  const editIva = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateIva(newIva);
    const updateProject = currentProject.realUpdate();
    setProjectInfo(updateProject);
  };

  const editAdmin = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateAdmin(newIva);
    const updateProject = currentProject.realUpdate();
    setProjectInfo(updateProject);
  };

  const editUnforeseen = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateUnforeseen(newIva);
    const updateProject = currentProject.realUpdate();
    setProjectInfo(updateProject);
  };

  const editUtility = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newIva = parseFloat(evt.target.value) / 100;
    currentProject.updateUtility(newIva);
    const updateProject = currentProject.realUpdate();
    setProjectInfo(updateProject);
  };

  const helpfulAlert = (
    message: string,
    color: string,
    time: number,
    icon: string
  ) => {
    setWarningProps({
      message: message,
      warningState: true,
      icon: icon,
      color: color,
    });
    console.log(message);
    setTimeout(() => {
      setWarningProps({
        message: "Aquí aparecerán tus mensajes",
        warningState: false,
        icon: "info",
        color: "primary_theme",
      });
    }, time * 1000);
  };

  const deleteSubActivity = (activityId: string, subActivityId: string) => {
    const removeSubActivity = currentProject.deleteSubActivity(
      activityId,
      subActivityId
    );

    const updateProject = currentProject.realUpdate();
    setProjectInfo(updateProject);

    helpfulAlert(
      `Has eliminado la sub actividad: ${removeSubActivity[0].subActivity_apu.apu_name}`,
      "primary_theme",
      3,
      "info"
    );
  };

  return (
    <CideinLayOut>
      <CideinWarning
        state={warningProps.warningState}
        message={warningProps.message}
        color={warningProps.color}
        icon={warningProps.icon}
        setWarningProps={setWarningProps}
      />
      <div className="grid col_sm_3 gap_sm_12">
        <div className="span_sm_2 cidein_window">
          {activeTab ? (
            <div className="cidein_window_1">
              <input
                type="text"
                className="title_input my_sm_16"
                onChange={changeProjectTitle}
                value={projectInfo.project_general_info.name}
                placeholder="Nombre del proyecto"
              />
              <textarea
                name="description"
                id="description"
                className="body_1 description_input"
                onChange={editDescription}
                value={projectInfo.project_general_info.description}
                placeholder="Descripción del proyecto"
              ></textarea>
              <div className="table_container">
                <table className="cidein_table">
                  <thead>
                    <tr>
                      <td className="border_top_left">Item</td>
                      <td>Descripción de actividad</td>
                      <td>Unidad</td>
                      <td>Cantidad</td>
                      <td>Valor unitario</td>
                      <td className="border_top_right">Valor Total</td>
                    </tr>
                  </thead>
                  {projectInfo.project_activities.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <p>Agrega actividades para empezar tu Cotización</p>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {/* ACTIVIDADES */}
                      {projectInfo.project_activities.map((activity, index) => {
                        return (
                          <React.Fragment key={activity.activity_id}>
                            <tr className="activity_name">
                              <td colSpan={6}>
                                <div className="activity_header">
                                  <div className="activity_name_index">
                                    <p className="table_index">{`${
                                      index + 1
                                    }`}</p>
                                    <input
                                      type="text"
                                      className="table_name_input"
                                      id={activity.activity_id}
                                      value={activity.activity_name}
                                      onChange={changeActivityName}
                                    />
                                  </div>
                                  <div className="activity_options">
                                    <div className="delete_activity">
                                      <span
                                        className="material-symbols-outlined"
                                        onClick={() =>
                                          deleteActivity(activity.activity_id)
                                        }
                                      >
                                        delete
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            {/* CREAR FILA PARA MATERIALES */}
                            {activity.subActivities.map(
                              (subActivity, subIndex) => {
                                return (
                                  <React.Fragment
                                    key={subActivity.subActivity_apu.apu_id}
                                  >
                                    <tr className="subActivity_row">
                                      <td>{`${index + 1}.${subIndex + 1}`}</td>
                                      <td>
                                        {subActivity.subActivity_apu.apu_name}
                                      </td>
                                      <td>
                                        {subActivity.subActivity_apu.apu_unit}
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="table_input"
                                          value={subActivity.amount}
                                          onChange={handleSubactivityAmount}
                                          id={`amount+${activity.activity_id}+${subActivity.subActivity_id}`}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="table_input"
                                          value={
                                            subActivity.subActivity_apu
                                              .apu_price
                                          }
                                          onChange={handleSubactivityValue}
                                          id={`vu+${activity.activity_id}+${subActivity.subActivity_id}`}
                                        />
                                      </td>
                                      <td>
                                        <div className="subActivity_options">
                                          {Formatter(
                                            subActivity.subActivity_total
                                          )}
                                          <span
                                            className="material-symbols-outlined"
                                            onClick={() =>
                                              deleteSubActivity(
                                                activity.activity_id,
                                                subActivity.subActivity_id
                                              )
                                            }
                                          >
                                            cancel
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              }
                            )}
                            <tr className="subtotal_activity">
                              <td colSpan={2}>Subtotal Actividad</td>
                              <td colSpan={4} className="subtotal_price">
                                {Formatter(activity.subtotal_activity)}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                      {/* Valores finales */}
                      <tr className="subtotal_activity">
                        <td colSpan={2}>Costo Directo</td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.direct_costs)}
                        </td>
                      </tr>
                      <tr className="subtotal_activity">
                        <td colSpan={2}>
                          Administración (
                          {projectInfo.project_config.ADMIN * 100}
                          %)
                        </td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.admin)}
                        </td>
                      </tr>
                      <tr className="subtotal_activity">
                        <td colSpan={2}>
                          Imprevistos (
                          {projectInfo.project_config.UNFORESEEN * 100}
                          %)
                        </td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.unforeseen)}
                        </td>
                      </tr>
                      <tr className="subtotal_activity">
                        <td colSpan={2}>
                          Utilidad ({projectInfo.project_config.UTILITY * 100}%)
                        </td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.utility)}
                        </td>
                      </tr>
                      <tr className="subtotal_activity">
                        <td colSpan={2}>
                          IVA ({projectInfo.project_config.IVA * 100}%)
                        </td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.IVA)}
                        </td>
                      </tr>
                      <tr className="subtotal_activity">
                        <td colSpan={2}>Valor Total </td>
                        <td colSpan={4} className="subtotal_price">
                          {Formatter(projectInfo.budget_prices.total_cost)}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          ) : (
            <div className="cidein_window_2">
              <QueryResult
                loading={GetFullApuResponse.loading}
                error={GetFullApuResponse.error}
                data={GetFullApuResponse.data}
                searchName="apu"
              >
                <div className="apu_description my_sm_16">
                  <h5>{selectedApu.apu_name}</h5>
                  <p className="txt_left body_1">
                    {selectedApu.apu_description}
                  </p>
                </div>
                <div className="table_container">
                  <table className="cidein_table">
                    <thead>
                      <tr>
                        <td className="border_top_left">Código</td>
                        <td>Descripción</td>
                        <td>Unidad</td>
                        <td>Cantidad</td>
                        <td>Valor unitario</td>
                        <td>RUD</td>
                        <td className="border_top_right">Valor parcial</td>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedApu.apu_materials.map((material, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{material.material_code}</td>
                            <td>{material.material_name}</td>
                            <td>{material.material_unit}</td>
                            <td>{material.material_amount}</td>
                            <td>
                              {Formatter(material.material_unitary_price)}
                            </td>
                            <td>{material.material_rud}</td>
                            <td>
                              {Formatter(material.material_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_equipment.map((equipment, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{equipment.equipment_code}</td>
                            <td>{equipment.equipment_name}</td>
                            <td>{equipment.equipment_unit}</td>
                            <td>{equipment.equipment_amount}</td>
                            <td>
                              {Formatter(equipment.equipment_unitary_price)}
                            </td>
                            <td>{equipment.equipment_rud}</td>
                            <td>
                              {Formatter(equipment.equipment_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_workHand.map((workHand, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{workHand.workHand_code}</td>
                            <td>{workHand.workHand_name}</td>
                            <td>{workHand.workHand_unit}</td>
                            <td>{workHand.workHand_amount}</td>
                            <td>
                              {Formatter(workHand.workHand_unitary_price)}
                            </td>
                            <td>{workHand.workHand_rud}</td>
                            <td>
                              {Formatter(workHand.workHand_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_transportation.map(
                        (transport, index) => {
                          return (
                            <tr className="subActivity_row" key={index}>
                              <td>{transport.transportation_code}</td>
                              <td>{transport.transportation_name}</td>
                              <td>{transport.transportation_unit}</td>
                              <td>{transport.transportation_amount}</td>
                              <td>
                                {Formatter(
                                  transport.transportation_unitary_price
                                )}
                              </td>
                              <td>{transport.transportation_rud}</td>
                              <td>
                                {Formatter(
                                  transport.transportation_partial_value
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                      {selectedApu.apu_apu.map((apu, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{apu.apu_id}</td>
                            <td>{apu.apu_name}</td>
                            <td>{apu.apu_unit}</td>
                            <td>{apu.apu_amount}</td>
                            <td>{Formatter(apu.apu_price)}</td>
                            <td>{apu.apu_rud}</td>
                            <td>{Formatter(apu.apu_partial_value)}</td>
                          </tr>
                        );
                      })}
                      <tr className="subtotal_activity">
                        <td colSpan={2}>Subtotal APU</td>
                        <td colSpan={5} className="subtotal_price">
                          {Formatter(selectedApu.apu_price)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </QueryResult>
            </div>
          )}
        </div>
        <div className="span_sm_1">
          <div className="grid col_sm_2 gap_sm_12 my_sm_16">
            {PillsInfo.map((pill, index) => (
              <BudgetPills name={pill.name} icon={pill.icon} key={index} />
            ))}
          </div>
          <div className="pill_selection_container my_sm_16">
            <div className="activity_selector_nav">
              <h5>APUS</h5>
              <select
                name="activity"
                id="activity"
                onChange={handleSelectedActivity}
              >
                <option value="">SELECCIONE ACTIVIDAD</option>
                {activityList.map((activity) => (
                  <option
                    id={activity.id}
                    value={activity.id}
                    key={activity.id}
                  >
                    {activity.name}
                  </option>
                ))}
              </select>
            </div>
            <SearchBox setSearchedApus={setSearchedApus} />
            <div className="results_container">
              {searchedApus.length === 0 ? (
                <p>No hemos encontrado lo que buscabas...</p>
              ) : (
                searchedApus.map((apu: any) => {
                  return (
                    <ApuCard
                      apuInfo={{ ...apu }}
                      addSubActivity={addSubActivity}
                      setTab={setActiveTab}
                      visualizeExternalAPU={visualizeExternalAPU}
                      key={apu.apu_id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_options_nav">
        <div className="bottom_nav_container">
          <div
            className={`project_general_config_menu ${
              configMenu ? "hide" : ""
            }`}
          >
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IVA(%)</p>
              </div>
              <div className="config_value">
                <input
                  type="number"
                  value={projectInfo.project_config.IVA * 100}
                  placeholder="iva"
                  onChange={editIva}
                />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">ADMINISTRACIÓN(%)</p>
              </div>
              <div className="config_value">
                <input
                  type="number"
                  value={projectInfo.project_config.ADMIN * 100}
                  placeholder="ADMINISTRACIÓN"
                  onChange={editAdmin}
                />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IMPREVISTOS(%)</p>
              </div>
              <div className="config_value">
                <input
                  type="number"
                  value={projectInfo.project_config.UNFORESEEN * 100}
                  placeholder="IMPREVISTOS"
                  onChange={editUnforeseen}
                />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">UTILIDAD(%)</p>
              </div>
              <div className="config_value">
                <input
                  type="number"
                  value={projectInfo.project_config.UTILITY * 100}
                  placeholder="utilidad"
                  onChange={editUtility}
                />
              </div>
            </div>
          </div>
          <ul>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => setActiveTab(true)}
                >
                  hub
                </span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => addActivity()}
                >
                  library_add
                </span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined">save</span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => setConfigMenu(!configMenu)}
                >
                  settings
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </CideinLayOut>
  );
}

export default Presupuestos;
