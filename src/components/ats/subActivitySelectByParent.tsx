import { useLazyQuery, useQuery } from "@apollo/client";
import Select, { SingleValue } from 'react-select'
import { selectStyles } from "../../settings/selectStyles";
import { useEffect } from "react";
import ATS from "../../utils/ats/ats";
import { GET_ACTIVITIES_BY_PARENT } from "../../assets/ats_queries/activities.query";

type SelectBox = {
    isEmpty: boolean
    handleSubtaskSelect: (evt: SelectType) => void
    parentId: string
    setATS_INFO: React.Dispatch<React.SetStateAction<ATSFromQuery>>
    atsControll: ATS
  };

  type ActivityProps = {
    name: string,
    _id: string
  }

type SelectType = SingleValue<{
    value: string;
    label: string;
}>

export default function SubActivitySelectBoxByParent({  isEmpty, handleSubtaskSelect, parentId, atsControll, setATS_INFO }:SelectBox){
    const [loadSubActivities, {data, loading, error}] = useLazyQuery(GET_ACTIVITIES_BY_PARENT, {variables: {
        parentId
    }});

    useEffect(() => {
        loadSubActivities()
    }, [parentId]);

    if(data){
        let activitiesList = data.subActivitiesListByParentId as ATSSubTaskFromQuery[];
        let selectPairs = activitiesList.map(activity=>{return({
            value: activity._id,
            label: activity.name
        })})

        const handleSubtask = (evt: SelectType) => {
            const selectedSubtask = activitiesList.find(subtask=>subtask._id === evt?.value)
            if(selectedSubtask !== undefined){
                //@ts-ignore
                atsControll.ats.specificTask = selectedSubtask
                setATS_INFO(atsControll.stateCopy)
            }
        }

        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        {/* <label htmlFor={name}>{label}</label> */}
        <Select options={selectPairs} onChange={handleSubtask} className="editable_input" placeholder="Selecciona una actividad..."  styles={selectStyles} />
    </div>
    }

    if(error){
        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <Select onChange={handleSubtaskSelect} className="editable_input" placeholder="Selecciona una actividad..."  styles={selectStyles} />
    </div>
    }

    if(loading){
        return <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <Select onChange={handleSubtaskSelect} className="editable_input" placeholder="Selecciona una actividad..."  styles={selectStyles} />
    </div>
    }

    return (
        <div className={`input_container gap_12 ${isEmpty ? 'error' : ''}`}>
        <Select onChange={handleSubtaskSelect} className="editable_input" placeholder="Selecciona una actividad..."  styles={selectStyles} />
    </div>
    )

}