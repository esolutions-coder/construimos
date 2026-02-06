import { SetStateAction } from "react";
import ApuCard from "../../../components/apuCard";
import SearchBox from "../../../components/search";
import CideinProject from "../../../utils/project_constructor";
import BudgetPills from "./budgetPills";
import { BudgetProvider, useBudgetContext } from "../context/budgetContext";
import { useParams } from "react-router-dom";


type BudgetRightMenuProps = {
    handleSelectedActivity: (evt: React.ChangeEvent<HTMLSelectElement>) => void
    setSearchedApus: React.Dispatch<React.SetStateAction<SearchedApusState>>
    searchedApus: SearchedApusState
    addSubActivity: (apuId: string, flag: string) => Promise<void>
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
    currentProject: CideinProject
    env: "editor" | "creator"
    id?: string
    setSelectedApu: React.Dispatch<React.SetStateAction<APU>>
}

export default function BudgetRightMenu({handleSelectedActivity, setSearchedApus, searchedApus, addSubActivity, env, setSelectedApu}: BudgetRightMenuProps) {
  const { setActiveTab, currentProject, projectInfo } = useBudgetContext();
  const { projectId } = useParams();
    return(
        <div className="pill_selection_container my_sm_16">
          <BudgetPills setActiveTab={setActiveTab} env={env} id={projectId}/> 
            <div className="activity_selector_nav">
              <h5>ACTIVIDAD</h5>
              {/* Los apus se podrán seleccionar de la bases de datos de Construimos o una base de datos Local */}
              <select
                name="activity"
                id="activity"
                onChange={handleSelectedActivity}
              >
                <option value="">SELECCIONE ACTIVIDAD</option>
                {projectInfo.project_activities.map((activity) => (
                  <option
                    id={activity.activity_id}
                    value={activity.activity_id}
                    key={activity.activity_id}
                  >
                    {activity.activity_name}
                  </option>
                ))}
              </select>
            </div>
            <SearchBox setSearchedApus={setSearchedApus} currentProject={currentProject}/>
            <div className="results_container">
              {searchedApus.apus.length === 0 ? (
                <p>No hemos encontrado lo que buscabas...</p>
              ) : (
                searchedApus.apus.map((apu: any) => {
                  return (
                    <ApuCard
                      apuInfo={{ ...apu }}
                      addSubActivity={addSubActivity}
                      setTab={setActiveTab}
                      key={apu.apu_id}
                      flag={searchedApus.db} 
                      currentProject={currentProject} 
                      setSelectedApu={setSelectedApu}
                      />
                  );
                })
              )}
            </div>
          </div>
    )
}