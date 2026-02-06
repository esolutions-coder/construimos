/*
AddWorkhandForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";
import CideinWarning from "../../../components/warning";

type AddWorkhandProps = {
  handleSave: Function;
};

export default function AddWorkhandForm({ handleSave }: AddWorkhandProps) {
  const [data, setData] = useState<CIDEINWorkhand>({
    _id: "",
  } as CIDEINWorkhand);
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
        } as CIDEINWorkhand)
    );
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    helpfulAlert(
      "Trabajador guardado en el proyecto exitosamente",
      "success_theme",
      5,
      "check_circle"
    );
    handleSave(data, "workhand");
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
          <label htmlFor="workHand_name">NOMBRE DEL TRABAJADOR</label>
          <input
            type="text"
            placeholder="Nombre del trabajador"
            name="workHand_name"
            value={data?.workHand_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="workHand_unit">UNIDAD</label>
          <input
            type="text"
            placeholder="Unidad"
            name="workHand_unit"
            value={data?.workHand_unit}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="workHand_rud">RUD</label>
          <input
            type="text"
            placeholder="Rendimiento / Desperdicio"
            name="workHand_rud"
            value={data?.workHand_rud}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="workHand_unitary_price">PRECIO UNITARIO</label>
          <input
            type="text"
            placeholder="Precio Unitario"
            name="workHand_unitary_price"
            value={data?.workHand_unitary_price}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="workHand_code">CÓDIGO</label>
          <input
            type="text"
            placeholder="Código"
            name="workHand_code"
            value={data?.workHand_code}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="workHand_provider">PROVEEDOR</label>
          <input
            type="text"
            placeholder="Proveedor"
            name="workHand_provider"
            value={data?.workHand_provider}
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
