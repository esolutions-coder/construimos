/*
AddMaterialForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";
import CideinWarning from "../../../components/warning";

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

  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "El material se ha creado correctamente",
    color: "primary_theme",
    icon: "info",
  });

  const helpfulAlert = (
    message: string,
    color: string,
    time: number,
    icon: string
  ) => {
    setWarningProps({
      message: message,
      warningState: true,
      icon: icon,
      color: color,
    });

    setTimeout(() => {
      setWarningProps({
        message: "Aquí aparecerán tus mensajes",
        warningState: false,
        icon: "info",
        color: "primary_theme",
      });
    }, time * 1000);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    helpfulAlert(
      "Material guardado en el proyecto exitosamente",
      "success_theme",
      5,
      "check_circle"
    );
    handleSave(data, "material");
  };

  return (
    <div className="add_containers my_sm_16">
      <CideinWarning
        state={warningProps.warningState}
        message={warningProps.message}
        color={warningProps.color}
        icon={warningProps.icon}
        setWarningProps={setWarningProps}
      />
      <form className="cidein_form_single" onSubmit={handleSubmit}>
        <div className="form_input_container">
          <label htmlFor="material_name">NOMBRE DEL MATERIAL</label>
          <input
            type="text"
            placeholder="Nombre del material"
            name="material_name"
            value={data?.material_name}
            onChange={handleChange}
            required={true}
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
            required={true}
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
            required={true}
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
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_code">CÓDIGO</label>
          <input
            type="text"
            placeholder="Código del material"
            name="material_code"
            value={data?.material_code}
            onChange={handleChange}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_category">CATEGORÍA</label>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            name="material_category"
            value={data?.material_category}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_provider">PROVEEDOR</label>
          <input
            type="text"
            placeholder="Nombre del proveedor"
            name="material_provider"
            value={data?.material_provider}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button className="btn secondary_theme my_sm_16" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}
