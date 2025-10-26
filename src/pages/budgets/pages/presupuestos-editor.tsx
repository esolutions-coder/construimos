//GENERAL
import { useEffect, useState } from "react";

//COMPONENTS
import CideinLayOut from "../../../components/cidein_layout";

//INFO
import Project from "../../../assets/info_json/project_info.json";
import SubActivityMock from "../../../assets/info_json/subActivityMock.json";

//UTILS
import React from "react";
import CideinWarning from "../../../components/warning";
import CideinProject from "../../../utils/project_constructor";

//APOLLO
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

//QUERIES
import { SAVE_PROJECT_BUDGET } from "../../../api/budgets/projects.mutations";
import { GET_FULL_APU_BY_ID } from "../../../assets/apus_queries/allApus";
import ApuMock from "../../../assets/info_json/layout_apu.json";
import ApuCreator from "../../../utils/apus_constructor";
import BudgetBottomNavBar from "../.././budgets/components/budgetBottomNavBar";
import BudgetRightMenu from "../.././budgets/components/budgetRightMenu";
import LocalApuRightMenu from "../.././budgets/components/localApuRightMenu";
import ApusPreview from "../.././budgets/pages/apusPreview";
import BudgetPage from "../.././budgets/pages/budgetPage";
import CreateLocalApu from "../.././budgets/pages/createLocalApu";
import { GET_PROJECT_BY_ID } from "../../../api/budgets/projects.queries";
import { useParams } from "react-router-dom";


const apus = Project.apus;
const local_apus = Project.local_apus;
const project_activities_initial_state = Project.project_activities;
const budget_prices = Project.budget_prices;
const project_config = Project.project_config;
const project_general_info = Project.project_general_info;

const currentProject = new CideinProject(
  apus,
  project_activities_initial_state,
  local_apus,
  budget_prices,
  project_config,
  project_general_info
);

const currentApu = new ApuCreator(
  ApuMock._id,
  ApuMock.apu_name,
  ApuMock.apu_unit,
  ApuMock.apu_price,
  ApuMock.apu_materials,
  ApuMock.apu_equipment,
  ApuMock.apu_description,
  ApuMock.apu_workHand,
  ApuMock.apu_transportation,
  ApuMock.apu_apu,
  ApuMock.apu_chaper
);

export default function PresupuestosEditor() {
  const {projectId} = useParams();
  const {loading, error, data} = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      projectId
    }
  })

  useEffect(()=>{
    if(data){
      let projectData = data.getProjectById as CIDEINProject;
      currentProject.apus = JSON.parse(JSON.stringify(projectData.apus));
      currentProject.project_activities = currentProject.projectActivitiesBuilder(JSON.parse(JSON.stringify(projectData.project_activities))),
      currentProject.project_config = JSON.parse(JSON.stringify(projectData.project_config)),
      currentProject.project_general_info = JSON.parse(JSON.stringify(projectData.project_general_info))
      
      setProjectInfo(currentProject.state);
    }
  },[data])

  const [projectInfo, setProjectInfo] = useState<CIDEINProject>(currentProject.state);
  const [activityList, setActivityList] = useState([{ activity_name: "", activity_id: "" }]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchedApus, setSearchedApus] = useState<SearchedApusState>({
    apus: [],
    db: "construimos_db"
  });

  const [apuInfo, setApuInfo] = useState<APUNoId>(currentApu);

  //Active tab changes between the cidein_window_1 (true) --> Presupuesto and cidein_window_2 (false)--> Single APU
  const [activeTab, setActiveTab] = useState("budget");
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
    if (addFullApuResponse.data) {
      const analizedApu = currentProject.APUCalculator(
        addFullApuResponse.data.apu
      );

      const newSubActivity: SubActivities = {
        subActivity_apu: { ...analizedApu },
        amount: 0,
        subActivity_total: 0,
        subActivity_id: Date.now().toString(),
        flag: "construimos_db"
      };

      currentProject.apus.push(JSON.parse(JSON.stringify(addFullApuResponse.data.apu)));

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

  const addSubActivity = async (apuId: string, flag: string) => {
    if(flag === "construimos_db"){
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
    }

    if(flag === "local_db"){
      //Look for the APU in the local DB and add it to currentProject
      const localApu = currentProject.filterApuById(apuId);
      
      if (localApu) {
        const analizedApu = currentProject.APUCalculator(
          localApu
        );
  
        const newSubActivity: SubActivities = {
          subActivity_apu: { ...analizedApu },
          amount: 0,
          subActivity_total: 0,
          subActivity_id: Date.now().toString(),
          flag: "local_db"
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
    }
  };

  const handleSelectedActivity = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedActivity = evt.target.value;
    setSelectedActivity(selectedActivity);
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

  let activeTabContent:JSX.Element = <></>;
  let rightMenu:JSX.Element = <></>;

  switch (activeTab) {
    case "budget":
      activeTabContent = <BudgetPage currentProject={currentProject} setActivityList ={setActivityList} projectInfo={projectInfo} setProjectInfo={setProjectInfo}/>

      rightMenu=<BudgetRightMenu handleSelectedActivity={handleSelectedActivity} projectInfo={projectInfo} setSearchedApus={setSearchedApus} searchedApus={searchedApus} addSubActivity={addSubActivity} setActiveTab={setActiveTab} visualizeExternalAPU={visualizeExternalAPU} currentProject={currentProject}/>;
      break;
    case "apu_viewer":
      activeTabContent = <ApusPreview GetFullApuResponse={GetFullApuResponse} selectedApu={selectedApu} />
      break;
    case "create_apus_local":
        activeTabContent = <CreateLocalApu  apuInfo={apuInfo} setApuInfo={setApuInfo} currentApu={currentApu} currentProject={currentProject}/>
        rightMenu=<LocalApuRightMenu currentApu={currentApu} setApuInfo={setApuInfo}/>
        break;
    default:
      activeTabContent = <BudgetPage currentProject={currentProject} setActivityList ={setActivityList} projectInfo={projectInfo} setProjectInfo={setProjectInfo}/>

      rightMenu=<BudgetRightMenu handleSelectedActivity={handleSelectedActivity} projectInfo={projectInfo} setSearchedApus={setSearchedApus} searchedApus={searchedApus} addSubActivity={addSubActivity} setActiveTab={setActiveTab} visualizeExternalAPU={visualizeExternalAPU} currentProject={currentProject}/>;
      break;
  }

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
          {activeTabContent}
        </div>
        <div className="span_sm_1">
        
          {rightMenu}
        </div>
      </div>
      <BudgetBottomNavBar currentProject={currentProject} projectInfo={projectInfo} setProjectInfo={setProjectInfo} setActiveTab={setActiveTab} saveProject={()=>{}}/>
    </CideinLayOut>
  );
}
