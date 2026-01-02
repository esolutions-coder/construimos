import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TRANSPORTATION_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { TransportationCard } from "./materialCard";
import QueryResult from "./QueryResult";
import { useBudgetContext } from "../pages/budgets/context/budgetContext";

interface SearchBoxProps {
  addTransportation: Function;
  bdd: "construimos_db" | "local_db";
}

export default function SearchTransportation({
  addTransportation, bdd
}: SearchBoxProps) {
  const { currentProject } = useBudgetContext();
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchTransportation, { loading, error, data }] = useLazyQuery(
    GET_TRANSPORTATION_BY_USERINPUT
  );

    const handleSearch = () => {
    if(bdd === "construimos_db"){
      console.log("Searching remote transportation for:", userInput);
      searchTransportation({ variables: { userInput } })
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
      setSearchedThings(data.transportationByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input
          type="text"
          placeholder="Buscar Transporte"
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
            <QueryResult loading={loading} error={error} data={data} searchName="transportationByString">
              {searchedThings.map((transportation: CIDEINTransportation) => {
                return <TransportationCard transportation={transportation} key={transportation.transportation_code} addTransportation={addTransportation} />;
              })}
            </QueryResult>
          ) : (
            <div className="results_container">
              {searchedThings.map((transportation: CIDEINTransportation) => {
                return <TransportationCard transportation={transportation} key={transportation.transportation_code} addTransportation={addTransportation} />;
              })}
            </div>
          )}
        </div>
    </div>
  );
}
