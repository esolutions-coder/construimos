/*
AddMaterialForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";

type AddMaterialProps = {
    handleSave: Function
}

export default function AddMaterialForm({handleSave}:AddMaterialProps){
    const [data, setData] = useState<CIDEINTransportation>({ _id: '' } as CIDEINTransportation);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        console.log(name)
        setData((prev)=>({
            ...prev,
            [name]:value
        }) as CIDEINTransportation)
    }

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleSave(data, "transportation");
    }

    return(
        <div className="add_container my_sm_16">
            <form className="cidein_form_single" onSubmit={handleSubmit}>
              <div className="form_input_container">
                <label htmlFor="material_name">NOMBRE DEL TRANSPORTADOR</label>
                <input
                  type="text"
                  placeholder="Nombre del transportador"
                  name="transportation_name"
                  value={data?.transportation_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="transportation_unit">UNIDAD</label>
                <input type="text" placeholder="Unidad" name="transportation_unit" value={data?.transportation_unit} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="transportation_rud">RUD</label>
                <input type="text" placeholder="Rendimiento / Desperdicio" name="transportation_rud" value={data?.transportation_rud} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="transportation_unitary_price" >PRECIO UNITARIO</label>
                <input
                  type="text"
                  placeholder="Precio Unitario"
                  name="transportation_unitary_price"
                  value={data?.transportation_unitary_price}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="transportation_code">CÓDIGO</label>
                <input type="text" placeholder="Unidad" name="transportation_code" value={data?.transportation_code} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="material_provider">PROVEEDOR</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  name="transportation_provider"
                  value={data?.transportation_provider}
                  onChange={handleChange}
                />
              </div>
              <button className="btn secondary_theme my_sm_16" type="submit">Guardar</button>
            </form>
          </div>
    )
}