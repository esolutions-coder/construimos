import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TRANSPORTATION_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { TransportationCard } from "./materialCard";
import QueryResult from "./QueryResult";

interface SearchBoxProps {
  addTransportation: Function;
}

export default function SearchTransportation({
  addTransportation,
}: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchWorkHand, { loading, error, data }] = useLazyQuery(
    GET_TRANSPORTATION_BY_USERINPUT
  );

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
          onClick={() => searchWorkHand({ variables: { userInput } })}
        >
          Buscar
        </button>
      </div>
      <div className="results_container">
        <QueryResult
          error={error}
          data={data}
          loading={loading}
          searchName="transportationByString"
        >
          {searchedThings.map((transportation: CIDEINTransportation) => {
            return (
              <TransportationCard
                transportation={transportation}
                key={transportation.transportation_code}
                addTransportation={addTransportation}
              />
            );
          })}
        </QueryResult>
      </div>
    </div>
  );
}
