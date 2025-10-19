import { useQuery } from "@apollo/client";
import Select, { SingleValue } from 'react-select'
import { selectStyles } from "../../settings/selectStyles";
import { GET_ACTIVITIES } from "../../assets/ats_queries/activities.query";

type SelectBox = {
    label: string;
    name: string;
    isEmpty: boolean
    value: string
    handleSubtaskSelect: (evt: SelectType) => void
  };

  type ActivityProps = {
    name: string,
    _id: string
  }

type SelectType = SingleValue<{
    value: string;
    label: string;
}>

export default function ActivitySelectBox({ label, name, isEmpty, value, handleSubtaskSelect }:SelectBox){
    const {data, loading, error} = useQuery(GET_ACTIVITIES);
    const handleSelectedMaterial = (evt: React.ChangeEvent<HTMLSelectElement>) => {}

    if(data){
        let activitiesList = data.activitiesList as ActivityProps[];
        let selectPairs = activitiesList.map(activity=>{return({
            value: activity._id,
            label: activity.name
        })})

        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        {/* <label htmlFor={name}>{label}</label> */}
        <Select options={selectPairs} onChange={handleSubtaskSelect} className="editable_input" placeholder="Selecciona una actividad..."  styles={selectStyles} />
    </div>
    }

    if(error){
        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <select className="editable_input width_100" id={name} name={name} onChange={handleSelectedMaterial} value={value}>
            <option value="undefined">Ha ocurrido un error cargando los materiales.</option>
        </select>
    </div>
    }

    if(loading){
        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <select className="editable_input width_100" id={name} name={name} onChange={handleSelectedMaterial} value={value}>
            <option value="undefined">Cargando lista de materiales.</option>
        </select>
    </div>
    }

    return (
        <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <select className="editable_input width_100" id={name} name={name} onChange={handleSelectedMaterial} value={value}>
            <option value="undefined">Cargando lista de materiales.</option>
        </select>
    </div>
    )

}