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
  const [data, setData] = useState<CIDEINTransportation>({
    _id: "",
  } as CIDEINTransportation);

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
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    console.log(name);
    setData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as CIDEINTransportation)
    );
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    helpfulAlert(
      "Transportación guardada en el proyecto exitosamente",
      "success_theme",
      5,
      "check_circle"
    );
    handleSave(data, "transportation");
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
          <label htmlFor="material_name">NOMBRE DEL TRANSPORTADOR</label>
          <input
            type="text"
            placeholder="Nombre del transportador"
            name="transportation_name"
            value={data?.transportation_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="transportation_unit">UNIDAD</label>
          <input
            type="text"
            placeholder="Unidad"
            name="transportation_unit"
            value={data?.transportation_unit}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="transportation_rud">RUD</label>
          <input
            type="text"
            placeholder="Rendimiento / Desperdicio"
            name="transportation_rud"
            value={data?.transportation_rud}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="transportation_unitary_price">PRECIO UNITARIO</label>
          <input
            type="text"
            placeholder="Precio Unitario"
            name="transportation_unitary_price"
            value={data?.transportation_unitary_price}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="transportation_code">CÓDIGO</label>
          <input
            type="text"
            placeholder="Codigo"
            name="transportation_code"
            value={data?.transportation_code}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="material_provider">PROVEEDOR</label>
          <input
            type="text"
            placeholder="Nombre del proveedor"
            name="transportation_provider"
            value={data?.transportation_provider}
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
