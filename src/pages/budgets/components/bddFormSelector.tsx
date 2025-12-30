import { useState } from "react";

type BddFormProps = {
    handleData: Function
}
export default function BddFormSelector({handleData}:BddFormProps){
    const [selectedBdd, setSelectedBdd] = useState("local_db");

    const handleSelectedBdd = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBdd(evt.target.name);
        handleData(evt.target.value);
      };

    return(
        <form className="bdd_selector">
          <div className="radio_group_container">
            <label htmlFor="local_bdd">LOCAL</label>
            <input type="radio" name="bdd" id="local_db" onChange={handleSelectedBdd} value="local_db"/>
          </div>
          <div className="radio_group_container">
            <label htmlFor="construimos_bdd">CONSTRUIMOS</label>
            <input type="radio" name="bdd" id="construimos_db" onChange={handleSelectedBdd} value="construimos_db"/>
          </div>
        </form>
    )
}