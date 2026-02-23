// src/context/MyContext.tsx
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import CideinProject from "../../../utils/project_constructor";
import Project from "../../../assets/info_json/project_info.json";
import ApuMock from "../../../assets/info_json/layout_apu.json";
import ApuCreator from "../../../utils/apus_constructor";
import SubActivityMock from "../../../assets/info_json/subActivityMock.json";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_FULL_APU_BY_ID } from "../../../assets/apus_queries/allApus";
import BudgetPage from "../pages/budgetPage";
import BudgetRightMenu from "../components/budgetRightMenu";
import ApusPreview from "../pages/apusPreview";
import CreateLocalApu from "../pages/createLocalApu";
import LocalApuRightMenu from "../components/localApuRightMenu";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../customHooks/auth/useAuth";
import { EDIT_PROJECT_BY_ID, GET_PROJECT_BY_ID } from "../../../api/budgets/projects.queries";
import { SAVE_PROJECT_BUDGET } from "../../../api/budgets/projects.mutations";

// Define la forma de tu contexto
interface BudgetContextType {
  currentProject: CideinProject;
  currentApu: ApuCreator;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedApu: APU;
  setSelectedApu: React.Dispatch<React.SetStateAction<APU>>;
  getFullApu: Function;
  GetFullApuResponse: any;
  apuInfo: APUNoId;
  setApuInfo: React.Dispatch<React.SetStateAction<APUNoId>>;
  apuCreatorFlag: boolean;
  setApuCreatorFlag: React.Dispatch<React.SetStateAction<boolean>>;
  activeTabContent: JSX.Element;
  rightMenu: JSX.Element;
  projectInfo: CIDEINProject;
  setProjectInfo: React.Dispatch<React.SetStateAction<CIDEINProject>>;
  activityList: { activity_name: string; activity_id: string }[];
  helpfulAlert: (message: string, color: string, time: number, icon: string) => void;
  saveNewProject: () => void;
  updateProject: () => void;
  editData: any;
  editError: any;
  editLoading: boolean;
  addFullApuResponse: any;
  selectedActivity: string;
  addSubCounter: boolean;
  saveNewProjectData: any;
  warningProps: {
    warningState: boolean;
    message: string;
    color: string;
    icon: string;
  };
  setWarningProps: React.Dispatch<
    React.SetStateAction<{
      warningState: boolean;
      message: string;
      color: string;
      icon: string;
    }>
  >;
}

// Crea el contexto con undefined inicial
const MyContext = createContext<BudgetContextType | undefined>(undefined);

const currentProject = new CideinProject(
  Project.apus,
  Project.local_apus,
  Project.local_materials,
  Project.local_equipment,
  Project.local_transportation,
  Project.local_workHand,
  Project.project_activities,
  Project.budget_prices,
  Project.project_config,
  Project.project_general_info,
  Project.user_id,
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
  ApuMock.apu_chaper,
);

// Proveedor del contexto
export function BudgetProvider({ children }: { children: any }) {
  const [activeTab, setActiveTab] = useState("budget");
  const [apuCreatorFlag, setApuCreatorFlag] = useState(false);
  const [selectedApu, setSelectedApu] = useState(SubActivityMock as APU);
  const [apuInfo, setApuInfo] = useState<APUNoId>(currentApu);
  const [activityList, setActivityList] = useState([{ activity_name: "", activity_id: "" }]);
  const [projectInfo, setProjectInfo] = useState<CIDEINProject>(currentProject.state);

  const { user } = useAuth();

  const { projectId } = useParams();

  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
    color: "primary_theme",
    icon: "info",
  });

  const [selectedActivity, setSelectedActivity] = useState("");
  const [addSubCounter, setAddSubCounter] = useState(true);

  const [saveBuget, saveNewProjectData] = useMutation(SAVE_PROJECT_BUDGET);

  //Search the full info of the selected APU
  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      projectId,
    },
  });
  const [getFullApu, GetFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
  const [addFullApu, addFullApuResponse] = useLazyQuery(GET_FULL_APU_BY_ID);
  const [editProject, { data: editData, error: editError, loading: editLoading }] = useMutation(EDIT_PROJECT_BY_ID);

  const [searchedApus, setSearchedApus] = useState<SearchedApusState>({
    apus: [],
    db: "construimos_db",
  });

  let activeTabContent: JSX.Element = <></>;
  let rightMenu: JSX.Element = <></>;

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

  const addSubActivity = async (apuId: string, flag: string) => {
    if (flag === "construimos_db") {
      console.log(apuId);
      if (selectedActivity !== "") {
        helpfulAlert("Añadiendo actividad, por favor espere...", "success_theme", 5, "add_task");
        setAddSubCounter(!addSubCounter);
        addFullApu({
          variables: {
            apuId,
          },
        });
      }
    }

    if (flag === "local_db") {
      //Look for the APU in the local DB and add it to currentProject
      const localApu = currentProject.filterApuById(apuId);

      if (localApu) {
        const analizedApu = currentProject.APUCalculator(localApu);

        const newSubActivity: SubActivities = {
          subActivity_apu: { ...analizedApu },
          amount: 0,
          subActivity_total: 0,
          subActivity_id: Date.now().toString(),
          flag: "local_db",
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
    }
  };

  const handleSelectedActivity = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedActivity = evt.target.value;
    setSelectedActivity(selectedActivity);
  };

  const updateProject = () => {
    currentProject.user_id = user?._id || "";
    editProject({
      variables: {
        projectId: projectId,
        projectData: currentProject.toApi,
      },
    });
  };

  const saveNewProject = () => {
    if (user) {
      currentProject.user_id = user._id;
      saveBuget({
        variables: {
          projectData: currentProject.toApi,
        },
      });
    }
  };

  //Page Switcher
  switch (activeTab) {
    case "budget":
      activeTabContent = (
        <BudgetPage
          setActivityList={setActivityList}
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          setSelectedApu={setSelectedApu}
          setTab={setActiveTab}
        />
      );

      rightMenu = (
        <BudgetRightMenu
          handleSelectedActivity={handleSelectedActivity}
          setSearchedApus={setSearchedApus}
          searchedApus={searchedApus}
          addSubActivity={addSubActivity}
          setActiveTab={setActiveTab}
          currentProject={currentProject}
          env="editor"
          setSelectedApu={setSelectedApu}
        />
      );
      break;
    case "apu_viewer":
      console.log("Display: Apu Viewer");
      activeTabContent = <ApusPreview GetFullApuResponse={GetFullApuResponse} selectedApu={selectedApu} />;
      break;
    case "create_apus_local":
      console.log("Display: Create Local Apus");
      activeTabContent = <CreateLocalApu />;
      rightMenu = <LocalApuRightMenu />;
      break;
    case "local_apu_viewer":
      activeTabContent = <CreateLocalApu />;
      rightMenu = <LocalApuRightMenu />;
      break;
    case "project_not_found":
      activeTabContent = (
        <div className="no_searched">
          <span className="material-symbols-outlined no_select">sentiment_very_dissatisfied</span>
          <p className="caption">No hemos encontrado este proyecto...</p>
        </div>
      );
      break;
    default:
      activeTabContent = (
        <BudgetPage
          setActivityList={setActivityList}
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          setSelectedApu={setSelectedApu}
          setTab={setActiveTab}
        />
      );

      rightMenu = (
        <BudgetRightMenu
          handleSelectedActivity={handleSelectedActivity}
          setSearchedApus={setSearchedApus}
          searchedApus={searchedApus}
          addSubActivity={addSubActivity}
          setActiveTab={setActiveTab}
          currentProject={currentProject}
          env="editor"
          setSelectedApu={setSelectedApu}
        />
      );
      break;
  }

  useEffect(() => {
    if (data) {
      let projectData = data.getProjectById as CIDEINProject;
      if (projectData !== null) {
        currentProject.apus = JSON.parse(JSON.stringify(projectData.apus));
        currentProject.local_apus = JSON.parse(JSON.stringify(projectData.local_apus));
        currentProject.local_materials = JSON.parse(JSON.stringify(projectData.local_materials));
        ((currentProject.project_activities = currentProject.projectActivitiesBuilder(JSON.parse(JSON.stringify(projectData.project_activities)))),
          (currentProject.project_config = JSON.parse(JSON.stringify(projectData.project_config))),
          (currentProject.project_general_info = JSON.parse(JSON.stringify(projectData.project_general_info))));
        setProjectInfo(currentProject.state);
      } else {
        setProjectInfo(currentProject.state);
        setActiveTab("project_not_found");
      }
    }
  }, [data]);

  useEffect(() => {
    if (projectId === "new") {
      setProjectInfo(currentProject.state);
    }
  }, [projectId]);
  return (
    <MyContext.Provider
      value={{
        currentProject,
        currentApu,
        activeTab,
        setActiveTab,
        selectedApu,
        setSelectedApu,
        GetFullApuResponse,
        getFullApu,
        apuInfo,
        setApuInfo,
        apuCreatorFlag,
        setApuCreatorFlag,
        activeTabContent,
        rightMenu,
        projectInfo,
        activityList,
        setProjectInfo,
        helpfulAlert,
        updateProject,
        editData,
        editError,
        editLoading,
        addFullApuResponse,
        selectedActivity,
        warningProps,
        setWarningProps,
        addSubCounter,
        saveNewProject,
        saveNewProjectData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

// Hook para usar el contexto más fácilmente
export const useBudgetContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useBudgetContext debe usarse dentro de BudgetProvider");
  return context;
};
