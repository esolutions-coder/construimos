import AdminSearch from "../../../components/admin_search";
import Pill from "../../../components/pills";
import PillsInfo from "../../../assets/info_json/admin_pills.json";
import { useState } from "react";
import ApuCreator from "../../../utils/apus_constructor";

type LocalApuRightMenuProps = {
    currentApu: ApuCreator
    setApuInfo: React.Dispatch<React.SetStateAction<APUNoId>>
}

export default function LocalApuRightMenu({currentApu, setApuInfo}: LocalApuRightMenuProps) {
    const [pillsState, setPillsState] = useState([false, false, false, false]);
    const addMaterial = (material: CIDEINMaterials) => {
        currentApu.addMaterial(material);
        setApuInfo(currentApu.updateApu());
      };
    
      const addEquipment = (equipment: CIDEINEquipment) => {
        currentApu.addEquipment(equipment);
        setApuInfo(currentApu.updateApu());
      };
    
      const addWorkHand = (workHand: CIDEINWorkhand) => {
        currentApu.addWorkHand(workHand);
        setApuInfo(currentApu.updateApu());
      };
    
      const addTransportation = (transportation: CIDEINTransportation) => {
        currentApu.addTransportation(transportation);
        setApuInfo(currentApu.updateApu());
      };

      const addApu = (apu: CIDEINAPU) => {
        currentApu.addApu(apu);
        setApuInfo(currentApu.updateApu());
      };
    return(
        <div className="span_sm_1">
          <div className="grid col_sm_2 gap_sm_12 my_sm_16">
            {PillsInfo.map((pill, index) => (
              <Pill
                name={pill.name}
                icon={pill.icon}
                pillState={pillsState[index]}
                pillIndex={index}
                setPillsState={setPillsState}
                key={index}
              />
            ))}
          </div>
          <div className="pill_selection_container">
            <div className="activity_selector_nav">
              <h5>BÚSQUEDA</h5>
            </div>
            <AdminSearch
              pillsInfo={pillsState}
              addMaterial={addMaterial}
              addEquipment={addEquipment}
              addWorkHand={addWorkHand}
              addTransportation={addTransportation}
              addApu={addApu}
            />
          </div>
        </div>
    )
}