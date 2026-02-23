import { SetStateAction, useEffect } from "react";
import Formatter from "../utils/formatter";
import CideinProject from "../utils/project_constructor";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";
import ApuCreator from "../utils/apus_constructor";

interface ApuCard {
  apuInfo: APU;
  addSubActivity: Function;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  flag: string
  currentProject: CideinProject
  setSelectedApu: React.Dispatch<SetStateAction<APU>>
}

function ApuCard({
  apuInfo,
  addSubActivity,
  flag
}: ApuCard) {

  const {setActiveTab, setApuCreatorFlag, setApuInfo, getFullApu, GetFullApuResponse, currentProject, setSelectedApu} = useBudgetContext();

  //Cargar data del apu seleccionado una vez el estado de data cambie
  useEffect(() => {
    if (GetFullApuResponse.data) {
      console.log("Data")
      const analizedApu = currentProject.APUCalculator(GetFullApuResponse.data.apu);
      setSelectedApu(analizedApu);
    }
  }, [GetFullApuResponse.data]);

  const setTabAndShowAPU = () => {
    if(flag==="construimos_db"){
      setActiveTab("apu_viewer");
      getFullApu({
        variables:{
          apuId: apuInfo._id
        }
      });
    }

    if(flag==="local_db"){
      setActiveTab("apu_viewer");
      setApuCreatorFlag(false);
      setApuInfo(apuInfo);
    }
  };

  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{apuInfo.apu_name}</p>
        <p className="apu_card_description">{apuInfo.apu_description}</p>
        <p className="apu_card_description">
          Costo: {flag === "construimos_db" ? Formatter(apuInfo.apu_price) : Formatter(currentProject.APUCalculator(apuInfo).apu_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => setTabAndShowAPU()}
        >
          visibility
        </span>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            addSubActivity(apuInfo._id, flag)
          }}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

export default ApuCard;
