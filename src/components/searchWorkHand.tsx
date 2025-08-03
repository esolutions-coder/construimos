import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WORKHAND_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { WorkHandCard } from "./materialCard";
import QueryResult from "./QueryResult";

interface SearchBoxProps {
  addWorkHand: Function;
}

const MAT = 0;
const EQP = 1;
const MDO = 2;
const APU = 3;

export default function SearchMaterials({ addWorkHand }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchWorkHand, { loading, error, data }] = useLazyQuery(
    GET_WORKHAND_BY_USERINPUT
  );

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
          searchName="workHandByString"
        >
          {searchedThings.map((workHand: CIDEINWorkhand) => {
            return (
              <WorkHandCard
                workHand={workHand}
                key={workHand.workHand_code}
                addWorkHand={addWorkHand}
              />
            );
          })}
        </QueryResult>
      </div>
    </div>
  );
}
