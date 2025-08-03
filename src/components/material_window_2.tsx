import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ADD_NEW_MATERIALS } from "../assets/apus_queries/materialsQueries";
import csvToJson from "../utils/csvToJson";
import Formatter from "../utils/formatter";
import MaterialCreator from "../utils/material_constructor";
import CideinWarning from "./warning";

let materialCreator: MaterialCreator;

export default function MaterialWindow2() {
  const [loadedMaterials, setLoadedMaterials] = useState<CIDEINMaterials[]>([
    {
      material_name: "",
      material_amount: 0,
      material_code: "",
      material_partial_value: 0,
      material_provider: "",
      material_rud: 0,
      material_unit: "",
      material_unitary_price: 0,
    },
  ]);

  const [fileStatus, setFileStatus] = useState(false);

  const [myFile, setMyFile] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message:
      "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
    color: "primary_theme",
    icon: "info",
  });

  const [addMaterials, { data, loading, error }] =
    useMutation(ADD_NEW_MATERIALS);

  const saveNewMaterials = () => {
    console.log([...loadedMaterials]);
    addMaterials({
      variables: {
        materialsData: [...loadedMaterials],
      },
    });
  };

  const loadMaterials = async () => {
    if (myFile) {
      const file = myFile.target.files;
      if (file) {
        const myData = (await csvToJson(file[0])) as CIDEINMaterials[];
        setFileStatus(true);
        materialCreator = new MaterialCreator(myData);
        setLoadedMaterials(materialCreator.updateMaterials());
      }
    }
  };

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

  useEffect(() => {
    if (error) {
      helpfulAlert("Hubo un error", "error_theme", 5, "warning");
    }
    if (data) {
      helpfulAlert(data.addMaterials.materials, "primary_theme", 5, "warning");
    }
  }, [data]);

  const deleteMaterial = (materialCode: string) => {
    materialCreator.deleteMaterials(materialCode);
    setLoadedMaterials(materialCreator.updateMaterials());
  };

  return (
    <div className="material_window_1 span_sm_2 my_sm_16">
      <CideinWarning
        state={warningProps.warningState}
        message={warningProps.message}
        color={warningProps.color}
        icon={warningProps.icon}
        setWarningProps={setWarningProps}
      />
      <h1 className="my_sm_16">Importar materiales</h1>
      <input type="file" onChange={(evt) => setMyFile(evt)} />
      <p>{fileStatus ? "Cargado" : "Sin cargar"}</p>
      <div className="table_container my_sm_16">
        <table className="cidein_table">
          <thead>
            <tr>
              <td className="border_top_left">Código</td>
              <td>Nombre</td>
              <td>Unidad</td>
              <td>RUD</td>
              <td>Valor unitario</td>
              <td className="border_top_right">Proveedor</td>
            </tr>
          </thead>
          <tbody>
            {loadedMaterials.length === 0 ||
            loadedMaterials[0].material_code === "" ? (
              <tr>
                <td colSpan={6}>
                  <p>Carga tu archivo...</p>
                </td>
              </tr>
            ) : (
              loadedMaterials.map((material) => {
                return (
                  <tr className="subActivity_row" key={material.material_code}>
                    <td>{material.material_code}</td>
                    <td>{material.material_name}</td>
                    <td>{material.material_unit}</td>
                    <td>{material.material_rud}</td>
                    <td>{Formatter(material.material_unitary_price)}</td>
                    <td>
                      <div className="subActivity_options">
                        {material.material_provider}
                        <span
                          className="material-symbols-outlined"
                          onClick={() => deleteMaterial(material.material_code)}
                        >
                          cancel
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="flex gap_sm_16">
          <button
            className="btn primary_theme my_sm_16"
            onClick={loadMaterials}
          >
            Subir materiales
          </button>
          <button
            className="btn primary_theme my_sm_16"
            onClick={saveNewMaterials}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
