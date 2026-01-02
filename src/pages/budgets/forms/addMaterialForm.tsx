/*
AddMaterialForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";

type AddMaterialProps = {
  handleSave: Function;
};

export default function AddMaterialForm({ handleSave }: AddMaterialProps) {
  const [data, setData] = useState<CIDEINMaterials>({
    _id: "",
  } as CIDEINMaterials);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as CIDEINMaterials)
    );
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSave(data, "material");
  };

  return (
    <div className="add_containers my_sm_16">
      <form className="cidein_form_single" onSubmit={handleSubmit}>
        <div className="form_input_container">
          <label htmlFor="material_name">NOMBRE DEL MATERIAL</label>
          <input
            type="text"
            placeholder="Nombre del material"
            name="material_name"
            value={data?.material_name}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_unit">UNIDAD</label>
          <input
            type="text"
            placeholder="Unidad"
            name="material_unit"
            value={data?.material_unit}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_rud">RUD</label>
          <input
            type="text"
            placeholder="Rendimiento / Desperdicio"
            name="material_rud"
            value={data?.material_rud}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_unitary_price">PRECIO UNITARIO</label>
          <input
            type="text"
            placeholder="Precio Unitario"
            name="material_unitary_price"
            value={data?.material_unitary_price}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_code">CÓDIGO</label>
          <input
            type="text"
            placeholder="Unidad"
            name="material_code"
            value={data?.material_code}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_category">CATEGORÍA</label>
          <input
            type="text"
            placeholder="Unidad"
            name="material_category"
            value={data?.material_category}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_provider">PROVEEDOR</label>
          <input
            type="text"
            placeholder="Unidad"
            name="material_provider"
            value={data?.material_provider}
            onChange={handleChange}
          />
        </div>
        <button className="btn secondary_theme my_sm_16" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}
