import { SetStateAction } from "react";
import Formatter from "../utils/formatter";
import CideinProject from "../utils/project_constructor";

interface ApuCard {
  apuInfo: APU;
  addSubActivity: Function;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  flag: string
  currentProject: CideinProject
  setSelectedApu: React.Dispatch<SetStateAction<APU>>
  //@ts-ignore
  getFullApu: LazyQueryExecFunction<any, OperationVariables>
}

function ApuCard({
  apuInfo,
  addSubActivity,
  setTab,
  setSelectedApu,
  flag,
  getFullApu
}: ApuCard) {

  const setTabAndShowAPU = () => {
    if(flag==="construimos_db"){
      setTab("apu_viewer");
      getFullApu({
        variables:{
          apuId: apuInfo._id
        }
      });
    }

    if(flag==="local_db"){
      setTab("local_apu_viewer");
      setSelectedApu(apuInfo);
    }

  };

  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{apuInfo.apu_name}</p>
        <p className="apu_card_description">{apuInfo.apu_description}</p>
        <p className="apu_card_description">
          Costo: {Formatter(apuInfo.apu_price)}
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
          onClick={() => addSubActivity(apuInfo._id, flag)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

export default ApuCard;
