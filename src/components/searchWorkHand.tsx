import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WORKHAND_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { WorkHandCard } from "./materialCard";
import QueryResult from "./QueryResult";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";

interface SearchBoxProps {
  addWorkHand: Function;
  bdd: "construimos_db" | "local_db";
}

export default function SearchWorkhand({ addWorkHand, bdd }: SearchBoxProps) {
  const { currentProject } = useBudgetContext();
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchWorkHand, { loading, error, data }] = useLazyQuery(
    GET_WORKHAND_BY_USERINPUT
  );

  const handleSearch = () => {
    if(bdd === "construimos_db"){
      console.log("Searching remote workhand for:", userInput);
      searchWorkHand({ variables: { userInput } })
    }
    if(bdd === "local_db"){
      console.log("Searching local workhand for:", userInput);
      console.log(currentProject);
      const searchResults = currentProject.searchLocalWorkhandByString(userInput);
      setSearchedThings(searchResults);
    }
  }

  useEffect(() => {
    if (data) {
      setSearchedThings(data.workHandByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input
          type="text"
          placeholder="Buscar Mano de obra"
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
            <QueryResult loading={loading} error={error} data={data} searchName="workHandByString">
              {searchedThings.map((workHand: CIDEINWorkhand) => {
                return <WorkHandCard workHand={workHand} key={workHand.workHand_code} addWorkHand={addWorkHand} />;
              })}
            </QueryResult>
          ) : (
            <div className="results_container">
              {searchedThings.map((workHand: CIDEINWorkhand) => {
                return <WorkHandCard workHand={workHand} key={workHand.workHand_code} addWorkHand={addWorkHand} />;
              })}
            </div>
          )}
        </div>
    </div>
  );
}
