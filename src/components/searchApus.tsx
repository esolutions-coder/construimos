import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_APU_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { ApuAdminCard } from "./materialCard";
import QueryResult from "./QueryResult";

interface SearchBoxProps {
  addApu: Function;
}

export default function SearchApus({ addApu }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchApus, { loading, error, data }] =
    useLazyQuery(GET_APU_BY_USERINPUT);

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
          onClick={() => searchApus({ variables: { userInput } })}
        >
          Buscar
        </button>
      </div>
      <div className="results_container">
        <QueryResult
          data={data}
          loading={loading}
          error={error}
          searchName="apuByString"
        >
          {searchedThings.map((apu: CIDEINAPU) => {
            return <ApuAdminCard apu={apu} key={apu.apu_id} addApu={addApu} />;
          })}
        </QueryResult>
      </div>
    </div>
  );
}
