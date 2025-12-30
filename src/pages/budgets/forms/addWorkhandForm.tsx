/*
AddWorkhandForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";

type AddWorkhandProps = {
  handleSave: Function
}

export default function AddWorkhandForm({handleSave}:AddWorkhandProps){
  const [data, setData] = useState<CIDEINWorkhand>({ _id: '' } as CIDEINWorkhand);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    console.log(name)
    setData((prev)=>({
      ...prev,
      [name]:value
    }) as CIDEINWorkhand)
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSave(data, "workhand");
  }

  return(
    <div className="add_container my_sm_16">
      <form className="cidein_form_single" onSubmit={handleSubmit}>
        <div className="form_input_container">
        <label htmlFor="workHand_name">NOMBRE DEL TRABAJADOR</label>
        <input
          type="text"
          placeholder="Nombre del trabajador"
          name="workHand_name"
          value={data?.workHand_name}
          onChange={handleChange}
        />
        </div>
        <div className="form_input_container">
        <label htmlFor="workHand_unit">UNIDAD</label>
        <input type="text" placeholder="Unidad" name="workHand_unit" value={data?.workHand_unit} onChange={handleChange}/>
        </div>
        <div className="form_input_container">
        <label htmlFor="workHand_rud">RUD</label>
        <input type="text" placeholder="Rendimiento / Desperdicio" name="workHand_rud" value={data?.workHand_rud} onChange={handleChange}/>
        </div>
        <div className="form_input_container">
        <label htmlFor="workHand_unitary_price">PRECIO UNITARIO</label>
        <input
          type="text"
          placeholder="Precio Unitario"
          name="workHand_unitary_price"
          value={data?.workHand_unitary_price}
          onChange={handleChange}
        />
        </div>
        <div className="form_input_container">
        <label htmlFor="workHand_code">CÓDIGO</label>
        <input type="text" placeholder="Código" name="workHand_code" value={data?.workHand_code} onChange={handleChange}/>
        </div>
        <div className="form_input_container">
        <label htmlFor="workHand_provider">PROVEEDOR</label>
        <input
          type="text"
          placeholder="Proveedor"
          name="workHand_provider"
          value={data?.workHand_provider}
          onChange={handleChange}
        />
        </div>
        <button className="btn secondary_theme my_sm_16" type="submit">Guardar</button>
      </form>
      </div>
  )
}