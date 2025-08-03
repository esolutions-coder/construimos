//GENERAL
import { useState } from "react";

//COMPONENTS
import CideinLayOut from "../components/cidein_layout";

//INFO
import ApuMock from "../assets/info_json/layout_apu.json";
import PillsInfo from "../assets/info_json/admin_pills.json";

//UTILS
import React from "react";
import Pill from "../components/pills";
import CideinWarning from "../components/warning";

//QUERIES
import { ADD_NEW_APU } from "../assets/apus_queries/allApus";
import ApuCreator from "../utils/apus_constructor";
import AdminSearch from "../components/admin_search";
import { useMutation } from "@apollo/client";
import AdminApuTable from "../components/admin_apus_table";

const currentApu = new ApuCreator(
  ApuMock._id,
  ApuMock.apu_name,
  ApuMock.apu_unit,
  ApuMock.apu_price,
  ApuMock.apu_materials,
  ApuMock.apu_equipment,
  ApuMock.apu_description,
  ApuMock.apu_workHand,
  ApuMock.apu_transportation,
  ApuMock.apu_apu,
  ApuMock.apu_chaper
);

function AdminApus() {
  const [apuInfo, setApuInfo] = useState<APUNoId>(currentApu);
  const [searchedThings, setSearchedThings] = useState<any[]>([]);

  //This state controls the type of search the admin executes
  /* material, equipment, workHand, apus */
  const [pillsState, setPillsState] = useState([false, false, false, false]);
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message:
      "Hey Hola, aquí aparecerán tus advertencias, deja de fisgonear jeje",
    color: "primary_theme",
    icon: "info",
  });

  //Save Apu
  const [createNewApu, createApuResponse] = useMutation(ADD_NEW_APU);
  //Show or hide general config menu
  const [configMenu, setConfigMenu] = useState(true);

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

  const editApuName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    currentApu.updateApuName(evt.target.value);
    setApuInfo(currentApu.updateApu());
  };

  const editApuUnit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    currentApu.updateApuUnit(evt.target.value);
    setApuInfo(currentApu.updateApu());
  };

  const editApuDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    currentApu.updateApuDescription(evt.target.value);
    setApuInfo(currentApu.updateApu());
  };

  const addMaterial = (material: CIDEINMaterials) => {
    currentApu.addMaterial(material);
    setApuInfo(currentApu.updateApu());
  };

  const addEquipment = (equipment: CIDEINEquipment) => {
    currentApu.addEquipment(equipment);
    setApuInfo(currentApu.updateApu());
  };

  const addWorkHand = (workHand: CIDEINWorkhand) => {
    currentApu.addWorkHand(workHand);
    setApuInfo(currentApu.updateApu());
  };

  const addTransportation = (transportation: CIDEINTransportation) => {
    currentApu.addTransportation(transportation);
    setApuInfo(currentApu.updateApu());
  };

  const addApu = (apu: CIDEINAPU) => {
    currentApu.addApu(apu);
    setApuInfo(currentApu.updateApu());
  };

  const updateMaterialAmount = (
    evt: React.ChangeEvent<HTMLInputElement>,
    materialCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `MAT*${materialCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateTransportationAmount = (
    evt: React.ChangeEvent<HTMLInputElement>,
    transportationCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `TPT*${transportationCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateEquipmentAmount = (
    evt: React.ChangeEvent<HTMLInputElement>,
    equipmentCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `EQP*${equipmentCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateWorkHandAmount = (
    evt: React.ChangeEvent<HTMLInputElement>,
    equipmentCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `MDO*${equipmentCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateApuAmount = (
    evt: React.ChangeEvent<HTMLInputElement>,
    apuCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `APU*${apuCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateApuRud = (
    evt: React.ChangeEvent<HTMLInputElement>,
    apuCode: string
  ) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuRud(newAmount, `APU*${apuCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const deleteApuItem = (itemType: string, itemId: string) => {
    const deletedItem = currentApu.deleteItem(itemType, itemId);
    setApuInfo(currentApu.updateApu());
    if (itemType === "APU" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINAPU;
      helpfulAlert(
        `Has eliminado el ítem ${deletedApuName.apu_name}`,
        "primary_theme",
        3,
        "warning"
      );
    }
    if (itemType === "MDO" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINWorkhand;
      helpfulAlert(
        `Has eliminado el ítem ${deletedApuName.workHand_name}`,
        "primary_theme",
        3,
        "warning"
      );
    }
    if (itemType === "MAT" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINMaterials;
      helpfulAlert(
        `Has eliminado el ítem ${deletedApuName.material_name}`,
        "primary_theme",
        3,
        "warning"
      );
    }
    if (itemType === "EQP" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINEquipment;
      helpfulAlert(
        `Has eliminado el ítem ${deletedApuName.equipment_name}`,
        "primary_theme",
        3,
        "warning"
      );
    }
  };

  const updateApuChapter = (chapter: string) => {
    currentApu.updateApuChapter(chapter);
    setApuInfo(currentApu.updateApu());
  };

  const saveApu = () => {
    const confirmApu = window.confirm(
      "¿Esta seguro de la información introducida?, Una vez guardada el tablero de creación se limpiará automaticamente"
    );

    if (!confirmApu) {
      helpfulAlert("Ha cancelado la operación", "primary_theme", 5, "info");
      return;
    }

    if (apuInfo.apu_name.trim() === "") {
      helpfulAlert(
        "Debes Asignar un nombre a tu APU",
        "error_theme",
        5,
        "info"
      );
      return;
    }
    if (apuInfo.apu_unit.trim() === "") {
      helpfulAlert(
        "Debes Asignar una unidad a tu APU",
        "error_theme",
        5,
        "info"
      );
      return;
    }
    if (apuInfo.apu_chapter.trim() === "") {
      helpfulAlert(
        "Debes Asignar un Capítulo a tu APU",
        "error_theme",
        5,
        "info"
      );
      return;
    }
    if (apuInfo.apu_description.trim() === "") {
      helpfulAlert(
        "Debes Asignar una descripción a tu APU",
        "error_theme",
        5,
        "info"
      );
      return;
    }
    if (
      apuInfo.apu_materials.length === 0 &&
      apuInfo.apu_equipment.length === 0 &&
      apuInfo.apu_workHand.length === 0 &&
      apuInfo.apu_transportation.length === 0 &&
      apuInfo.apu_apu.length === 0
    ) {
      helpfulAlert(
        "Este APU está vacío, agrega actividades para guardar",
        "error_theme",
        5,
        "info"
      );
      return;
    }
    const serializedApu = currentApu.serializeApu();
    console.log({ ...serializedApu });
    createNewApu({
      variables: {
        ...serializedApu,
      },
    });

    if (!createApuResponse.loading) {
      helpfulAlert(
        "El APU ha sido guardado",
        "success_theme",
        10,
        "check_circle"
      );
    }

    setApuInfo(currentApu.deleteApuInfo());
  };
  return (
    <CideinLayOut>
      <CideinWarning
        state={warningProps.warningState}
        message={warningProps.message}
        color={warningProps.color}
        icon={warningProps.icon}
        setWarningProps={setWarningProps}
      />
      <div className="grid col_sm_3 gap_sm_12">
        <div className="span_sm_2 cidein_window">
          <div className="cidein_window_2">
            <div className="apu_description my_sm_16">
              <div className="apu_general_name_unit flex gap_sm_12">
                <input
                  type="text"
                  className="title_input"
                  value={apuInfo.apu_name}
                  onChange={editApuName}
                  placeholder="Nombre del APU"
                  required={true}
                />
                <input
                  type="text"
                  className="unit_input"
                  value={apuInfo.apu_unit}
                  onChange={editApuUnit}
                  placeholder="Unidad"
                  required={true}
                />
              </div>
              <select
                name="apu_chapter"
                id="apu_chapter"
                className="my_sm_16 chapter_selector"
                onChange={(evt) => updateApuChapter(evt.target.value)}
              >
                <option value="">SELECCIONE CAPÍTULO</option>
                <option value="CONCRETOS EN OBRA">CONCRETOS EN OBRA</option>
                <option value="PAÑETES">PAÑETES</option>
                <option value="MORTEROS EN OBRA">MORTEROS EN OBRA</option>
                <option value="OBRAS PRELIMINARE">OBRAS PRELIMINARES</option>
                <option value="FORMALETAS">FORMALETAS</option>
                <option value="TUBERIAS DE CONCRETO">
                  TUBERÍAS DE CONCRETO
                </option>
                <option value="CAMARAS DE INSPECCION">
                  CAMARAS DE INSPECCION
                </option>
                <option value="CAJAS DE INSPECCION">CAJAS DE INSPECCION</option>
                <option value="EXCAVACIONES GENERALES">
                  EXCAVACIONES GENERALES
                </option>
                <option value="RELLENOS Y NIVELACIONES">
                  RELLENOS Y NIVELACIONES
                </option>
                <option value="ALCANTARILLADOS">ALCANTARILLADOS</option>
                <option value="ACUEDUCTOS">ACUEDUCTOS</option>
                <option value="TUBERIAS PVC">TUBERIA PVC</option>
              </select>
              <textarea
                name="description"
                id="description"
                className="body_1 description_input"
                value={apuInfo.apu_description}
                onChange={editApuDescription}
                placeholder="Descripción del APU"
                required={true}
              ></textarea>
            </div>
            <div className="table_container">
              <table className="cidein_table">
                <thead>
                  <tr>
                    <td className="border_top_left">Código</td>
                    <td>Descripción</td>
                    <td>Unidad</td>
                    <td>Cantidad</td>
                    <td>Valor unitario</td>
                    <td>RUD</td>
                    <td className="border_top_right">Valor parcial</td>
                  </tr>
                </thead>
                <AdminApuTable
                  MaterialOptions={{
                    apuMaterials: apuInfo.apu_materials,
                    updateMaterialAmount,
                  }}
                  EquipmentOptions={{
                    apuEquipment: apuInfo.apu_equipment,
                    updateEquipmentAmount,
                  }}
                  WorkHandOptions={{
                    apuWorkHand: apuInfo.apu_workHand,
                    updateWorkHandAmount,
                  }}
                  ApuApuOptions={{
                    apuApu: apuInfo.apu_apu,
                    updateApuAmount,
                    updateApuRud,
                  }}
                  TransportationOptions={{
                    apuTransportation: apuInfo.apu_transportation,
                    updateTransportationAmount,
                  }}
                  DeleteOptions={{ deleteApuItem }}
                  ApuPrice={apuInfo.apu_price}
                />
              </table>
            </div>
            <div className="save_apu">
              <button className="btn primary_theme" onClick={() => saveApu()}>
                Guardar APU
              </button>
            </div>
          </div>
        </div>
        <div className="span_sm_1">
          <div className="grid col_sm_2 gap_sm_12 my_sm_16">
            {PillsInfo.map((pill, index) => (
              <Pill
                name={pill.name}
                icon={pill.icon}
                pillState={pillsState[index]}
                pillIndex={index}
                setPillsState={setPillsState}
                key={index}
              />
            ))}
          </div>
          <div className="pill_selection_container">
            <div className="activity_selector_nav">
              <h5>BÚSQUEDA</h5>
            </div>
            <AdminSearch
              pillsInfo={pillsState}
              addMaterial={addMaterial}
              addEquipment={addEquipment}
              addWorkHand={addWorkHand}
              addTransportation={addTransportation}
              addApu={addApu}
            />
          </div>
        </div>
      </div>
      <div className="bottom_options_nav">
        <div className="bottom_nav_container">
          <div
            className={`project_general_config_menu ${
              configMenu ? "hide" : ""
            }`}
          >
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IVA(%)</p>
              </div>
              <div className="config_value">
                <input type="number" placeholder="iva" />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">ADMINISTRACIÓN(%)</p>
              </div>
              <div className="config_value">
                <input type="number" placeholder="ADMINISTRACIÓN" />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">IMPREVISTOS(%)</p>
              </div>
              <div className="config_value">
                <input type="number" placeholder="IMPREVISTOS" />
              </div>
            </div>
            <div className="config_field">
              <div className="config_name">
                <p className="caption">UTILIDAD(%)</p>
              </div>
              <div className="config_value">
                <input type="number" placeholder="utilidad" />
              </div>
            </div>
          </div>
          <ul>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined">hub</span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined">library_add</span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span className="material-symbols-outlined">save</span>
              </div>
            </li>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined"
                  onClick={() => setConfigMenu(!configMenu)}
                >
                  settings
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </CideinLayOut>
  );
}

export default AdminApus;
