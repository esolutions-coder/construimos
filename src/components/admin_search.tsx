import { BudgetProvider } from "../pages/budgets/context/budgetContext";
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
  bdd: "construimos_db" | "local_db";
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
  bdd
}: AdminSearchProps) {
  const selectedPill = pillsInfo.findIndex((pillInfo) => pillInfo === true);
  if (selectedPill === MAT) {
    return <BudgetProvider><SearchMaterials addMaterial={addMaterial} bdd={bdd} /></BudgetProvider>;
  }
  if (selectedPill === EQP) {
    return <BudgetProvider><SearchEquipment addEquipment={addEquipment} bdd={bdd}/></BudgetProvider>;
  }
  if (selectedPill === MDO) {
    return <BudgetProvider><SearchWorkHand addWorkHand={addWorkHand} bdd={bdd}/></BudgetProvider>;
  }

  if (selectedPill === APU) {
    return <BudgetProvider><SearchApus addApu={addApu} bdd={bdd}/></BudgetProvider>;
  }

  if (selectedPill === TPT) {
    return <BudgetProvider><SearchTransportation addTransportation={addTransportation} bdd={bdd}/></BudgetProvider>;
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
