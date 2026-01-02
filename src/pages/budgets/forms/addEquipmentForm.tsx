/*
AddMaterialForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";

type AddEquipmentProps = {
    handleSave: Function
}

export default function AddEquipmentForm({handleSave}:AddEquipmentProps){
    const [data, setData] = useState<CIDEINEquipment>({ _id: '' } as CIDEINEquipment);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = evt.target;
        console.log(name)
        setData((prev)=>({
            ...prev,
            [name]:value
        }) as CIDEINEquipment)
    }

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleSave(data, "equipment");
    }

    return(
        <div className="add_container my_sm_16">
            <form className="cidein_form_single" onSubmit={handleSubmit}>
              <div className="form_input_container">
                <label htmlFor="equipment_name">NOMBRE DEL EQUIPO</label>
                <input
                  type="text"
                  placeholder="Nombre del equipo"
                  name="equipment_name"
                  value={data?.equipment_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_unit">UNIDAD</label>
                <input type="text" placeholder="Unidad" name="equipment_unit" value={data?.equipment_unit} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_rud">RUD</label>
                <input type="text" placeholder="Rendimiento / Desperdicio" name="equipment_rud" value={data?.equipment_rud} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_unitary_price" >PRECIO UNITARIO</label>
                <input
                  type="text"
                  placeholder="Precio Unitario"
                  name="equipment_unitary_price"
                  value={data?.equipment_unitary_price}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_code">CÓDIGO</label>
                <input type="text" placeholder="Unidad" name="equipment_code" value={data?.equipment_code} onChange={handleChange}/>
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_category" >CATEGORÍA</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  name="equipment_category"
                  value={data?.equipment_category}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="equipment_provider">PROVEEDOR</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  name="equipment_provider"
                  value={data?.equipment_provider}
                  onChange={handleChange}
                />
              </div>
              <button className="btn secondary_theme my_sm_16" type="submit">Guardar</button>
            </form>
          </div>
    )
}