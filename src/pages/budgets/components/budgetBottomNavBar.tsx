import { useState } from "react";
import CideinProject from "../../../utils/project_constructor";

type BudgetBottomNavBarProps = {
    setProjectInfo: (value: React.SetStateAction<CIDEINProject>) => void,
    projectInfo: CIDEINProject
    currentProject: CideinProject
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function BudgetBottomNavBar({setProjectInfo, projectInfo, currentProject, setActiveTab}:BudgetBottomNavBarProps){
      //Show or hide general config menu
      const [configMenu, setConfigMenu] = useState(true);
      const [activityList, setActivityList] = useState([{ name: "", id: "" }]);
      
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
        }
      
        currentProject.addActivity(activity_mock);
        setProjectInfo(currentProject.state);};

              
    return(
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
                  onClick={() => setActiveTab("budget")}
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
                <span className="material-symbols-outlined"onClick={()=>{console.log(currentProject.toApi)}}>save</span>
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
    )
}