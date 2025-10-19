import { useState } from "react"
import Dropdowns from "./dropdowns";

type ModalsForBar = {
    states: any[]
}

export default function AtsHandfulBar({states}: ModalsForBar){
    const actions = {
        newActivity: states[0],
        newSubTask: states[1]
    }
    return(
        <div className="handfulBar secondary_theme">
            <ul className="cleanLists">
                <Dropdowns options={[{title: "Guardar", action: ()=>{}}]} title="Archivo"/>
                <Dropdowns options={[{title: "Crear usuario", action: ()=>{}}, {title: "Eliminar usuario", action: ()=>{}}]} title="Usuarios"/>
                <Dropdowns options={[{title: "Guardar", action: ()=>{}}, {title: "Nueva actividad", action: actions.newActivity}, {title: "Nueva tarea", action: actions.newSubTask}]} title="Actividades"/>
            </ul>
        </div>
    )
}