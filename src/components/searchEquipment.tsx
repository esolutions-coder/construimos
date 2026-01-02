import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_EQUIPMENT_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { EquipmentCard } from "./materialCard";
import QueryResult from "./QueryResult";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";

interface SearchBoxProps {
  addEquipment: Function;
  bdd: "construimos_db" | "local_db";
}

export default function SearchEquipment({ addEquipment, bdd }: SearchBoxProps) {
  const { currentProject } = useBudgetContext();
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchEquipment, { loading, error, data }] = useLazyQuery(GET_EQUIPMENT_BY_USERINPUT);

    const handleSearch = () => {
    if(bdd === "construimos_db"){
      console.log("Searching remote equipment for:", userInput);
      searchEquipment({ variables: { userInput } })
    }
    if(bdd === "local_db"){
      console.log("Searching local equipment for:", userInput);
      console.log(currentProject);
      const searchResults = currentProject.searchLocalEquipmentByString(userInput);
      setSearchedThings(searchResults);
    }
  }

  useEffect(() => {
    if (data) {
      setSearchedThings(data.equipmentByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input type="text" placeholder="Buscar Equipos" value={userInput} onChange={(evt) => setUserInput(evt.target.value)} />
        <button className="btn primary_theme" type="submit" onClick={handleSearch}>
          Buscar
        </button>
      </div>
        <div className="results_container">
          {bdd === "construimos_db" ? (
            <QueryResult loading={loading} error={error} data={data} searchName="equipmentByString">
              {searchedThings.map((equipment: CIDEINEquipment) => {
                return <EquipmentCard equipment={equipment} key={equipment.equipment_code} addEquipment={addEquipment} />;
              })}
            </QueryResult>
          ) : (
            <div className="results_container">
              {searchedThings.map((equipment: CIDEINEquipment) => {
                return <EquipmentCard equipment={equipment} key={equipment.equipment_code} addEquipment={addEquipment} />;
              })}
            </div>
          )}
        </div>
    </div>
  );
}
