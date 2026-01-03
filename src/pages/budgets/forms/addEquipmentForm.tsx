/*
AddMaterialForm

Esta funcion debe recibir un argumento en forma de función (any) el usuario decidirá en el componente padre en donde se debe almacenar la información recogida en este formulario
*/

import { ChangeEvent, FormEvent, useState } from "react";
import CideinWarning from "../../../components/warning";

type AddEquipmentProps = {
  handleSave: Function;
};

export default function AddEquipmentForm({ handleSave }: AddEquipmentProps) {
  const [data, setData] = useState<CIDEINEquipment>({
    _id: "",
  } as CIDEINEquipment);
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
        } as CIDEINEquipment)
    );
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    helpfulAlert(
      "Equipo guardado en el proyecto exitosamente",
      "success_theme",
      5,
      "check_circle"
    );
    handleSave(data, "equipment");
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
          <label htmlFor="equipment_name">NOMBRE DEL EQUIPO</label>
          <input
            type="text"
            placeholder="Nombre del equipo"
            name="equipment_name"
            value={data?.equipment_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="equipment_unit">UNIDAD</label>
          <input
            type="text"
            placeholder="Unidad"
            name="equipment_unit"
            value={data?.equipment_unit}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="equipment_rud">RUD</label>
          <input
            type="text"
            placeholder="Rendimiento / Desperdicio"
            name="equipment_rud"
            value={data?.equipment_rud}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="equipment_unitary_price">PRECIO UNITARIO</label>
          <input
            type="text"
            placeholder="Precio Unitario"
            name="equipment_unitary_price"
            value={data?.equipment_unitary_price}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="equipment_code">CÓDIGO</label>
          <input
            type="text"
            placeholder="Codigo"
            name="equipment_code"
            value={data?.equipment_code}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form_input_container">
          <label htmlFor="equipment_category">CATEGORÍA</label>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            name="equipment_category"
            value={data?.equipment_category}
            onChange={handleChange}
            required={true}
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
