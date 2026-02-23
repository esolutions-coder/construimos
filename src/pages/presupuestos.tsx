//GENERAL
import { useEffect, useState } from "react";

//COMPONENTS
import CideinLayOut from "../components/cidein_layout";

//INFO
import SubActivityMock from "../assets/info_json/subActivityMock.json";

//UTILS
import CideinWarning from "../components/warning";

//APOLLO
import { useLazyQuery } from "@apollo/client";

//QUERIES
import { GET_FULL_APU_BY_ID } from "../assets/apus_queries/allApus";
import BudgetBottomNavBar from "./budgets/components/budgetBottomNavBar";
import { useBudgetContext } from "./budgets/context/budgetContext";

function Presupuestos() {
  const { currentProject, currentApu, activeTabContent, rightMenu, setProjectInfo } = useBudgetContext();

  const [selectedActivity, setSelectedActivity] = useState("");

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

    setTimeout(() => {
      setWarningProps({
        message: "Aquí aparecerán tus mensajes",
        warningState: false,
        icon: "info",
        color: "primary_theme",
      });
    }, time * 1000);
  };

  return (
    <CideinLayOut>
      {/* Estas son las alertas */}
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
      <BudgetBottomNavBar
      />
    </CideinLayOut>
  );
}

export default Presupuestos;
