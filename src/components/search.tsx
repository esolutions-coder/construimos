import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_APU_BY_USERINPUT } from "../assets/apus_queries/allApus";
import CideinProject from "../utils/project_constructor";

interface SearchBoxProps {
  setSearchedApus: React.Dispatch<React.SetStateAction<SearchedApusState>>
  currentProject: CideinProject;
}

export default function SearchBox({ setSearchedApus, currentProject }: SearchBoxProps) {
  const [userInput, setUserInput] = useState("");

  //Puede ser construimos_db o local_db
  const [bdd, setBdd] = useState<string>("construimos_db");

  const [getApuByUser, { loading, error, data }] = useLazyQuery(GET_APU_BY_USERINPUT);

  const handleSelectedBdd = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setBdd(evt.target.value);
  };

  const handleSearch = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (bdd === "construimos_db") {
      getApuByUser({ variables: { userInput } });
    } else {
      const filteredApus = currentProject.filterApusByUserInput(userInput);
      setSearchedApus({
        apus: filteredApus,
        db: "local_db"
      });
    }
  };

  useEffect(() => {
    if (data) {
      setSearchedApus({
        apus: data.apuByString,
        db: "construimos_db"
      });
    }
  }, [data]);

  return (
    <div className="search_container">
      <div className="activity_selector_nav">
        <h5>BDD</h5>
        <select name="db_select" id="db_select" onChange={handleSelectedBdd}>
          <option value="construimos_db">Construimos</option>
          <option value="local_db">Base de Datos Local</option>
        </select>
      </div>
      <form className="search_box my_sm_16" onSubmit={handleSearch}>
        <input type="text" placeholder="Buscar APU" value={userInput} onChange={(evt) => setUserInput(evt.target.value)} />
        <button className="btn primary_theme" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}
