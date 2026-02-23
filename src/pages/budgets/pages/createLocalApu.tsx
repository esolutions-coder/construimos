import { useEffect, useState } from "react";
import AdminApuTable from "../../../components/admin_apus_table";
import CideinWarning from "../../../components/warning";
import { useBudgetContext } from "../context/budgetContext";

export default function CreateLocalApu() {
  const { setApuInfo, currentApu, apuInfo, currentProject, apuCreatorFlag, setProjectInfo } = useBudgetContext();
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "La APU se ha creado correctamente",
    color: "primary_theme",
    icon: "info",
  });

  useEffect(() => {
    if (apuCreatorFlag) {
      console.log("Creador de Apus Iniciado");
      currentApu.apu_id = `APU-${Date.now()}`;
      currentApu._id = currentApu.apu_id;
      currentApu.apu_name = "";
      currentApu.apu_unit = "";
      currentApu.apu_description = "";
      currentApu.apu_chapter = "";
      currentApu.apu_materials = [];
      currentApu.apu_equipment = [];
      currentApu.apu_workHand = [];
      currentApu.apu_transportation = [];
      currentApu.apu_apu = [];
      setApuInfo(currentApu.updateApu());
    } else {
      console.log(`Editando APU existente: ${apuInfo.apu_name}`);
      const selectedApu = currentProject.local_apus.find((apu) => apu._id === apuInfo._id);
      if (selectedApu) {
        currentApu.apu_id = selectedApu.apu_id;
        currentApu.apu_name = selectedApu.apu_name;
        currentApu.apu_unit = selectedApu.apu_unit;
        currentApu.apu_description = selectedApu.apu_description;
        currentApu.apu_chapter = selectedApu.apu_chapter;
        currentApu.apu_materials = selectedApu.apu_materials;
        currentApu.apu_equipment = selectedApu.apu_equipment;
        currentApu.apu_workHand = selectedApu.apu_workHand;
        currentApu.apu_transportation = selectedApu.apu_transportation;
        currentApu.apu_apu = selectedApu.apu_apu;
        currentApu._id = selectedApu._id;
        setApuInfo(currentApu.updateApu());
      }
    }
  }, [apuCreatorFlag]);

  const helpfulAlert = (message: string, color: string, time: number, icon: string) => {
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

  const updateApuChapter = (chapter: string) => {
    currentApu.updateApuChapter(chapter);
    setApuInfo(currentApu.updateApu());
  };

  const updateMaterialAmount = (evt: React.ChangeEvent<HTMLInputElement>, materialCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `MAT*${materialCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateTransportationAmount = (evt: React.ChangeEvent<HTMLInputElement>, transportationCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `TPT*${transportationCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateEquipmentAmount = (evt: React.ChangeEvent<HTMLInputElement>, equipmentCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `EQP*${equipmentCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateWorkHandAmount = (evt: React.ChangeEvent<HTMLInputElement>, equipmentCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `MDO*${equipmentCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateApuAmount = (evt: React.ChangeEvent<HTMLInputElement>, apuCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuAmount(newAmount, `APU*${apuCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const updateApuRud = (evt: React.ChangeEvent<HTMLInputElement>, apuCode: string) => {
    const newAmount = parseFloat(evt.target.value);
    currentApu.updateApuRud(newAmount, `APU*${apuCode}`);
    setApuInfo(currentApu.updateApu());
  };

  const deleteApuItem = (itemType: string, itemId: string) => {
    const deletedItem = currentApu.deleteItem(itemType, itemId);
    setApuInfo(currentApu.updateApu());
    if (itemType === "APU" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINAPU;
      helpfulAlert(`Has eliminado el ítem ${deletedApuName.apu_name}`, "primary_theme", 3, "warning");
    }
    if (itemType === "MDO" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINWorkhand;
      helpfulAlert(`Has eliminado el ítem ${deletedApuName.workHand_name}`, "primary_theme", 3, "warning");
    }
    if (itemType === "MAT" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINMaterials;
      helpfulAlert(`Has eliminado el ítem ${deletedApuName.material_name}`, "primary_theme", 3, "warning");
    }
    if (itemType === "EQP" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINEquipment;
      helpfulAlert(`Has eliminado el ítem ${deletedApuName.equipment_name}`, "primary_theme", 3, "warning");
    }
    if (itemType === "TPT" && deletedItem) {
      const deletedApuName = deletedItem[0] as CIDEINTransportation;
      helpfulAlert(`Has eliminado el ítem ${deletedApuName.transportation_name}`, "primary_theme", 3, "warning");
    }
  };

  const saveApu = () => {
    if (apuCreatorFlag) {
      console.log("Creando nuevo APU...");
      currentApu.apu_id = `APU-${Date.now()}`;
      currentApu._id = currentApu.apu_id;
      currentProject.local_apus.push(currentApu.state);
      helpfulAlert("APU guardado en el proyecto exitosamente", "success_theme", 5, "check_circle");
    }else{
      const apuIndex = currentProject.local_apus.findIndex((apu) => apu._id === apuInfo._id);
      console.log(`Editando APU existente en el proyecto... Índice encontrado: ${apuIndex}`);
      if (apuIndex !== -1) {
        currentProject.local_apus[apuIndex] = currentApu.state;
        setProjectInfo(currentProject);
        helpfulAlert("APU actualizado en el proyecto exitosamente", "success_theme", 5, "check_circle");
      }
    }
  };

  return (
    <div className="cidein_window_2">
      <div className="apu_description my_sm_16">
        <div className="apu_general_name_unit flex gap_sm_12">
          {warningProps.warningState && (
            <CideinWarning
              state={warningProps.warningState}
              message={warningProps.message}
              color={warningProps.color}
              icon={warningProps.icon}
              setWarningProps={setWarningProps}
            />
          )}
          <input type="text" className="title_input" value={apuInfo.apu_name} onChange={editApuName} placeholder="Nombre del APU" required={true} />
          <input type="text" className="unit_input" value={apuInfo.apu_unit} onChange={editApuUnit} placeholder="Unidad" required={true} />
        </div>
        <select name="apu_chapter" id="apu_chapter" className="my_sm_16 chapter_selector" onChange={(evt) => updateApuChapter(evt.target.value)}>
          <option value="">SELECCIONE CAPÍTULO</option>
          <option value="CONCRETOS EN OBRA">CONCRETOS EN OBRA</option>
          <option value="PAÑETES">PAÑETES</option>
          <option value="MORTEROS EN OBRA">MORTEROS EN OBRA</option>
          <option value="OBRAS PRELIMINARE">OBRAS PRELIMINARES</option>
          <option value="FORMALETAS">FORMALETAS</option>
          <option value="TUBERIAS DE CONCRETO">TUBERÍAS DE CONCRETO</option>
          <option value="CAMARAS DE INSPECCION">CAMARAS DE INSPECCION</option>
          <option value="CAJAS DE INSPECCION">CAJAS DE INSPECCION</option>
          <option value="EXCAVACIONES GENERALES">EXCAVACIONES GENERALES</option>
          <option value="RELLENOS Y NIVELACIONES">RELLENOS Y NIVELACIONES</option>
          <option value="ALCANTARILLADOS">ALCANTARILLADOS</option>
          <option value="ACUEDUCTOS">ACUEDUCTOS</option>
          <option value="TUBERIAS PVC">TUBERIA PVC</option>
          <option value="OTRO">OTRO</option>
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
  );
}
