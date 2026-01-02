import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_APU_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { ApuAdminCard } from "./materialCard";
import QueryResult from "./QueryResult";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";

interface SearchBoxProps {
  addApu: Function;
  bdd: "construimos_db" | "local_db";
}

export default function SearchApus({ addApu, bdd }: SearchBoxProps) {
  const { currentProject } = useBudgetContext();
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchApus, { loading, error, data }] =
    useLazyQuery(GET_APU_BY_USERINPUT);
    
    const handleSearch = () => {
    if(bdd === "construimos_db"){
      console.log("Searching remote apus for:", userInput);
      searchApus({ variables: { userInput } });
    }
    if(bdd === "local_db"){
      console.log("Searching local apus for:", userInput);
      console.log(currentProject);
      const searchResults = currentProject.searchLocalApuByString(userInput);
      setSearchedThings(searchResults);
    }
  }

  useEffect(() => {
    if (data) {
      setSearchedThings(data.apuByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input
          type="text"
          placeholder="Buscar APUS"
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
          {bdd === "construimos_db" ? (
            <QueryResult loading={loading} error={error} data={data} searchName="apuByString">
              {searchedThings.map((apu: CIDEINAPU) => {
                return <ApuAdminCard apu={apu} key={apu.apu_id} addApu={addApu} />;
              })}
            </QueryResult>
          ) : (
            <div className="results_container">
              {searchedThings.map((apu: CIDEINAPU) => {
                return <ApuAdminCard apu={apu} key={apu.apu_id} addApu={addApu} />;
              })}
            </div>
          )}
        </div>
    </div>
  );
}
