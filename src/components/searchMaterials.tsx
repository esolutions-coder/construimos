import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MATERIAL_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { MaterialCard } from "./materialCard";
import QueryResult from "./QueryResult";

interface SearchBoxProps {
  addMaterial: Function;
}

const MAT = 0;
const EQP = 1;
const MDO = 2;
const APU = 3;

export default function SearchMaterials({ addMaterial }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchMaterials, { loading, error, data }] = useLazyQuery(
    GET_MATERIAL_BY_USERINPUT
  );

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
          onClick={() => searchMaterials({ variables: { userInput } })}
        >
          Buscar
        </button>
      </div>
      <div className="results_container">
        <QueryResult
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
        </QueryResult>
      </div>
    </div>
  );
}
