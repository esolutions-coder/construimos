import React, { SetStateAction, useEffect, useState } from "react";
import CideinProject from "../../../utils/project_constructor";
import Project from "../../../assets/info_json/project_info.json";
import SubActivityMock from "../../../assets/info_json/subActivityMock.json";
import { useLazyQuery } from "@apollo/client";
import { GET_FULL_APU_BY_ID } from "../../../assets/apus_queries/allApus";
import Formatter from "../../../utils/formatter";
import Grid from "../../../components/layout/grid";
import { sub } from "date-fns";
import { useBudgetContext } from "../context/budgetContext";
import useContextMenu from "../hooks/useContextMenu";
import ContextMenu from "../components/contextMenu";

type BudgetPageProps = {
  projectInfo: CIDEINProject;
  setProjectInfo: React.Dispatch<React.SetStateAction<CIDEINProject>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setSelectedApu: React.Dispatch<SetStateAction<APU>>;
  setActivityList: React.Dispatch<
    React.SetStateAction<
      {
        activity_name: string;
        activity_id: string;
      }[]
    >
  >;
};

export default function BudgetPage({ setActivityList, projectInfo, setProjectInfo }: BudgetPageProps) {
  const { currentProject } = useBudgetContext();
  const [selectedActivity, setSelectedActivity] = useState("");
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const [subActivityInfo, setSubActivityInfo] = useState<SubActivities | null>(null);
  const [activityInfo, setActivityInfo] = useState<ProjecActivities | null>(null);

  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
    color: "primary_theme",
    icon: "info",
  });

  //Add the full info of the selected APU
  const [addFullApu, addFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
  //AddSubactivity
  const [addSubCounter, setAddSubCounter] = useState(true);

  const handleSubactivityAmount = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputId = evt.target.id;
    const splitInput = inputId.split("+");
    const [propName, activityId, subActivityId] = splitInput;
    let newSubActivityPrice = parseFloat(evt.target.value);

    currentProject.updateSubActivityAmount(activityId, subActivityId, newSubActivityPrice);
    setProjectInfo(currentProject.state);
  };

  useEffect(() => {
    if (addFullApuResponse.data) {
      const analizedApu = currentProject.APUCalculator(addFullApuResponse.data.apu);

      const newSubActivity: SubActivities = {
        subActivity_apu: { ...analizedApu },
        amount: 0,
        subActivity_total: 0,
        subActivity_id: Date.now().toString(),
        flag: "construimos_db",
      };

      newSubActivity.subActivity_total = currentProject.subActivityCalculator(newSubActivity);

      if (selectedActivity === "") {
        helpfulAlert("Debes seleccionar una actividad", "primary_theme", 5, "info");
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
    helpfulAlert(`Has eliminado la actividad ${deletedActivity[0].activity_name}`, "primary_theme", 3, "info");
  };

  const changeProjectGeneralInfoAttribute = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.id as keyof CideinProject["project_general_info"];
    const value = name === "postal_code" ? parseFloat(evt.target.value) : evt.target.value;
    //@ts-ignore
    currentProject.project_general_info[name] = value;
    setProjectInfo(currentProject.state);
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

  const deleteSubActivity = (activityId: string, subActivityId: string) => {
    const removeSubActivity = currentProject.deleteSubActivity(activityId, subActivityId);

    setProjectInfo(currentProject.state);

    helpfulAlert(`Has eliminado la sub actividad: ${removeSubActivity[0].subActivity_apu.apu_name}`, "primary_theme", 3, "info");
  };

  const handleContextMenu = (evt: React.MouseEvent<HTMLTableCellElement, MouseEvent>, subActivity: SubActivities, activity: ProjecActivities) => {
    evt.preventDefault();
    setClicked(true);
    setSubActivityInfo(subActivity);
    setActivityInfo(activity);
    setPoints({
      x: evt.pageX,
      y: evt.pageY,
    });
    console.log("Right Click", evt.pageX, evt.pageY);
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
      <Grid def={3} gap={12} lg={2} md={2} sm={2}>
        <input
          type="text"
          className="title_input my_sm_16"
          onChange={changeProjectGeneralInfoAttribute}
          value={projectInfo.project_general_info.location}
          placeholder="Localización"
          id="location"
        />
        <input
          type="text"
          className="title_input my_sm_16"
          onChange={changeProjectGeneralInfoAttribute}
          value={projectInfo.project_general_info.postal_code}
          placeholder="Código Postal"
          id="postal_code"
        />
      </Grid>
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
              {projectInfo.project_activities?.map((activity, index) => {
                return (
                  <React.Fragment key={activity.activity_id}>
                    <tr className="activity_name">
                      <td colSpan={6}>
                        <div className="activity_header">
                          <div className="activity_name_index">
                            <p className="table_index">{`${index + 1}`}</p>
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
                              <span className="material-symbols-outlined" onClick={() => deleteActivity(activity.activity_id)}>
                                delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* CREAR FILA PARA MATERIALES */}

                    {activity.subActivities?.map((subActivity, subIndex) => {
                      return (
                        <React.Fragment key={subActivity.subActivity_apu.apu_id}>
                          <tr className="subActivity_row">
                            <td>{`${index + 1}.${subIndex + 1}`}</td>
                            <td style={{ cursor: "pointer" }} onContextMenu={(e) => handleContextMenu(e, subActivity, activity)}>
                              {subActivity.subActivity_apu.apu_name}
                            </td>
                            <td>{subActivity.subActivity_apu.apu_unit}</td>
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
                              <div className="subActivity_options">
                                {Formatter(subActivity.subActivity_apu.apu_price)}
                              </div>
                            </td>
                            <td>
                              <div className="subActivity_options">
                                {Formatter(subActivity.subActivity_total)}
                                <span
                                  className="material-symbols-outlined"
                                  onClick={() => deleteSubActivity(activity.activity_id, subActivity.subActivity_id)}
                                >
                                  cancel
                                </span>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
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
                  Administración ({projectInfo.project_config.admin * 100}
                  %)
                </td>
                <td colSpan={4} className="subtotal_price">
                  {Formatter(projectInfo.budget_prices.admin)}
                </td>
              </tr>
              <tr className="subtotal_activity">
                <td colSpan={2}>
                  Imprevistos ({projectInfo.project_config.unforeseen * 100}
                  %)
                </td>
                <td colSpan={4} className="subtotal_price">
                  {Formatter(projectInfo.budget_prices.unforeseen)}
                </td>
              </tr>
              <tr className="subtotal_activity">
                <td colSpan={2}>Utilidad ({projectInfo.project_config.utility * 100}%)</td>
                <td colSpan={4} className="subtotal_price">
                  {Formatter(projectInfo.budget_prices.utility)}
                </td>
              </tr>
              <tr className="subtotal_activity">
                <td colSpan={2}>IVA ({projectInfo.project_config.iva * 100}%)</td>
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
        <ContextMenu subActivity={subActivityInfo} activity={activityInfo} clicked={clicked} points={points}/>
      </div>
    </div>
  );
}
