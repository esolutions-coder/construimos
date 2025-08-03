import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_APU_BY_USERINPUT } from "../assets/apus_queries/allApus";

interface SearchBoxProps {
  setSearchedApus: React.Dispatch<React.SetStateAction<APU[]>>;
}

export default function SearchBox({ setSearchedApus }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [getApuByUser, { loading, error, data }] =
    useLazyQuery(GET_APU_BY_USERINPUT);

  useEffect(() => {
    if (data) {
      setSearchedApus(data.apuByString);
    }
  }, [data]);

  return (
    <div className="search_box my_sm_16">
      <input
        type="text"
        placeholder="Buscar APU"
        value={userInput}
        onChange={(evt) => setUserInput(evt.target.value)}
      />
      <button
        className="btn primary_theme"
        type="submit"
        onClick={() => getApuByUser({ variables: { userInput } })}
      >
        Buscar
      </button>
    </div>
  );
}
