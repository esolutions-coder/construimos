import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_EQUIPMENT_BY_USERINPUT } from "../assets/apus_queries/allApus";
import { EquipmentCard } from "./materialCard";
import QueryResult from "./QueryResult";

interface SearchBoxProps {
  addEquipment: Function;
}

const MAT = 0;
const EQP = 1;
const MDO = 2;
const APU = 3;

export default function SearchEquipment({ addEquipment }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [searchedThings, setSearchedThings] = useState<any[]>([]);
  const [searchEquipment, { loading, error, data }] = useLazyQuery(
    GET_EQUIPMENT_BY_USERINPUT
  );

  useEffect(() => {
    if (data) {
      setSearchedThings(data.equipmentByString);
    }
  }, [data]);

  return (
    <div>
      <div className="search_box my_sm_16">
        <input
          type="text"
          placeholder="Buscar Equipos"
          value={userInput}
          onChange={(evt) => setUserInput(evt.target.value)}
        />
        <button
          className="btn primary_theme"
          type="submit"
          onClick={() => searchEquipment({ variables: { userInput } })}
        >
          Buscar
        </button>
      </div>
      <div className="results_container">
        <QueryResult
          data={data}
          loading={loading}
          error={error}
          searchName="equipmentByString"
        >
          {searchedThings.map((equipment: CIDEINEquipment) => {
            return (
              <EquipmentCard
                equipment={equipment}
                key={equipment.equipment_code}
                addEquipment={addEquipment}
              />
            );
          })}
        </QueryResult>
      </div>
    </div>
  );
}
