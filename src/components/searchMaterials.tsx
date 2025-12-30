import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MATERIAL_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { MaterialCard } from "./materialCard";
import QueryResult from "./QueryResult";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";

interface SearchBoxProps {
  addMaterial: Function;
  bdd: "construimos_db" | "local_db";
}

export default function SearchMaterials({ addMaterial, bdd }: SearchBoxProps) {
  //State from provider
  const { currentProject } = useBudgetContext();
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchMaterials, { loading, error, data }] = useLazyQuery(
    GET_MATERIAL_BY_USERINPUT
  );

  const handleSearch = () => {
    if(bdd === "construimos_db"){
      console.log("Searching remote materials for:", userInput);
      searchMaterials({ variables: { userInput } })
    }
    if(bdd === "local_db"){
      console.log("Searching local materials for:", userInput);
      console.log(currentProject);
      const searchResults = currentProject.searchLocalMaterialsByString(userInput);
      setSearchedThings(searchResults);
    }
  }

  useEffect(() => {
    if (data) {
      setSearchedThings(data.materialByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input
          type="text"
          placeholder="Buscar Materiales"
          value={userInput}
          onChange={(evt) => setUserInput(evt.target.value)}
        />
        <button
          className="btn primary_theme"
          type="submit"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="results_container">
        {bdd==="construimos_db" ? (<QueryResult
          loading={loading}
          error={error}
          data={data}
          searchName="materialByString"
        >
          {searchedThings.map((material: CIDEINMaterials) => {
            return (
              <MaterialCard
                material={material}
                key={material.material_code}
                addMaterial={addMaterial}
              />
            );
          })}
        </QueryResult>):(<div className="results_container">
          {searchedThings.map((material: CIDEINMaterials) => {
            return (
              <MaterialCard
                material={material}
                key={material.material_code}
                addMaterial={addMaterial}
              />
            );
          })}
        </div>)}
      </div>
    </div>
  );
}
