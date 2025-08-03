import SearchApus from "./searchApus";
import SearchEquipment from "./searchEquipment";
import SearchMaterials from "./searchMaterials";
import SearchTransportation from "./searchTransport";
import SearchWorkHand from "./searchWorkHand";

type AdminSearchProps = {
  pillsInfo: boolean[];
  addMaterial: Function;
  addEquipment: Function;
  addWorkHand: Function;
  addTransportation: Function;
  addApu: Function;
};

const MAT = 0;
const EQP = 1;
const MDO = 2;
const APU = 3;
const TPT = 4;

export default function AdminSearch({
  pillsInfo,
  addMaterial,
  addEquipment,
  addWorkHand,
  addTransportation,
  addApu,
}: AdminSearchProps) {
  const selectedPill = pillsInfo.findIndex((pillInfo) => pillInfo === true);
  if (selectedPill === MAT) {
    return <SearchMaterials addMaterial={addMaterial} />;
  }
  if (selectedPill === EQP) {
    return <SearchEquipment addEquipment={addEquipment} />;
  }
  if (selectedPill === MDO) {
    return <SearchWorkHand addWorkHand={addWorkHand} />;
  }

  if (selectedPill === APU) {
    return <SearchApus addApu={addApu} />;
  }

  if (selectedPill === TPT) {
    return <SearchTransportation addTransportation={addTransportation} />;
  }
  return (
    <div className="no_searched">
      <span className="material-symbols-outlined">search</span>
      <p className="caption">
        Hola!, selecciona una categoría y busca Materiales, Equipos, Mano de
        Obra...
      </p>
    </div>
  );
}
