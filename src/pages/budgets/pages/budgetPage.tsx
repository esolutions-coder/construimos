import React, { useEffect, useState } from "react"
import CideinProject from "../../../utils/project_constructor";
import Project from  "../../../assets/info_json/project_info.json";
import SubActivityMock from "../../../assets/info_json/subActivityMock.json";
import { useLazyQuery } from "@apollo/client";
import { GET_FULL_APU_BY_ID } from "../../../assets/apus_queries/allApus";
import Formatter from "../../../utils/formatter";

type BudgetPageProps = {
    currentProject: CideinProject
    setActivityList: React.Dispatch<React.SetStateAction<{
        activity_name: string;
        activity_id: string;
    }[]>>
}

export default function BudgetPage({currentProject, setActivityList}: BudgetPageProps) {

    const [projectInfo, setProjectInfo] = useState<CIDEINProject>(Project);
    // const [activityList, setActivityList] = useState([{ name: "", id: "" }]);
    const [selectedActivity, setSelectedActivity] = useState("");
    const [searchedApus, setSearchedApus] = useState<APU[]>([]);
  
    const [warningProps, setWarningProps] = useState({
      warningState: false,
      message:
        "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
      color: "primary_theme",
      icon: "info",
    });
  
    const subAct = SubActivityMock as APU;
    const [selectedApu, setSelectedApu] = useState(subAct);
    //Search the full info of the selected APU
    const [getFullApu, GetFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
    //Add the full info of the selected APU
    const [addFullApu, addFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
    //AddSubactivity
    const [addSubCounter, setAddSubCounter] = useState(true);
  
    useEffect(() => {
      const initializedProject = currentProject.state;
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
      setProjectInfo(currentProject.state);
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
      console.log(currentProject.state);
      setProjectInfo(currentProject.state);
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
          setProjectInfo(currentProject.state);
        }
      }
    }, [addFullApuResponse.data, addSubCounter]);
  
    const changeActivityName = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const newName = evt.target.value;
      const activityId = evt.target.id;
      currentProject.changeActivityName(activityId, newName);
      setActivityList(currentProject.activitiesList());
      setProjectInfo(currentProject.state);
    };
  
    const deleteActivity = (activityId: string) => {
      const deletedActivity = currentProject.deleteActivity(activityId);
      helpfulAlert(
        `Has eliminado la actividad ${deletedActivity[0].activity_name}`,
        "primary_theme",
        3,
        "info"
      );
    };
  
    const changeProjectTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = evt.target.value;
      currentProject.project_general_info.name = newTitle;
      setProjectInfo(currentProject.state);
    };
  
    const editDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newDescription = evt.target.value;
      currentProject.project_general_info.description = newDescription;
      setProjectInfo(currentProject.state);
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
  
      setProjectInfo(currentProject.state);
  
      helpfulAlert(
        `Has eliminado la sub actividad: ${removeSubActivity[0].subActivity_apu.apu_name}`,
        "primary_theme",
        3,
        "info"
      );
    };

    return (
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
    )
}