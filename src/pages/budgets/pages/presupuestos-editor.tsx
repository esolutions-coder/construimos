//GENERAL
import { useEffect, useState } from "react";

//COMPONENTS
import CideinLayOut from "../../../components/cidein_layout";

//INFO

//UTILS
import CideinWarning from "../../../components/warning";

//APOLLO

//QUERIES
import { useParams } from "react-router-dom";
import ApuMock from "../../../assets/info_json/layout_apu.json";
import ApuCreator from "../../../utils/apus_constructor";
import BudgetBottomNavBar from "../.././budgets/components/budgetBottomNavBar";
import { BudgetProvider, useBudgetContext } from "../context/budgetContext";

/*
Orden para las funciones
1. Contexto
2. Route Params
3. Estados
4. Queries y Mutations
5. UseEffects
*/

export default function PresupuestosEditor() {
  const { currentProject, setActiveTab, setSelectedApu, GetFullApuResponse, activeTabContent, rightMenu, projectInfo, setProjectInfo, helpfulAlert, editData, editError, editLoading,addFullApuResponse, selectedActivity, setWarningProps, warningProps, addSubCounter} =
    useBudgetContext();

  useEffect(() => {
    document.title = `${projectInfo.project_general_info.name} - CONSTRUÍMOS SAS` || "Editor de presupuestos";
  }, [projectInfo]);

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
        flag: "construimos_db",
      };

      currentProject.apus.push(
        JSON.parse(JSON.stringify(addFullApuResponse.data.apu))
      );

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

  //Cargar data del apu seleccionado una vez el estado de data cambie
  useEffect(() => {
    if (GetFullApuResponse.data) {
      const analizedApu = currentProject.APUCalculator(
        GetFullApuResponse.data.apu
      );
      setSelectedApu(analizedApu);
    }
  }, [GetFullApuResponse.data]);


  useEffect(() => {
    if (editData) {
      alert("Exito actualizando");
    }
    if (editError) {
      alert("Error Guardando los datos");
    }
  }, [editData, editError, editLoading]);
  
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
          <div className="span_sm_2 cidein_window">{activeTabContent}</div>
          <div className="span_sm_1">{rightMenu}</div>
        </div>
        <BudgetBottomNavBar/>
      </CideinLayOut>
  );
}
