import Formatter from "../utils/formatter";

interface MaterialCard {
  material: CIDEINMaterials;
  addMaterial: Function;
}

interface EquipmentCard {
  equipment: CIDEINEquipment;
  addEquipment: Function;
}

interface WorkHandCard {
  workHand: CIDEINWorkhand;
  addWorkHand: Function;
}

interface AdminApuCard {
  apu: CIDEINAPU;
  addApu: Function;
}

interface TransportationCard {
  transportation: CIDEINTransportation;
  addTransportation: Function;
}

function MaterialCard({ material, addMaterial }: MaterialCard) {
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{material.material_name}</p>
        <p className="apu_card_description">
          {`Unidad: ${material.material_unit}`}
        </p>
        <p className="apu_card_description">
          Costo ({material.material_unit}):{" "}
          {Formatter(material.material_unitary_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => addMaterial(material)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

function EquipmentCard({ equipment, addEquipment }: EquipmentCard) {
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{equipment.equipment_name}</p>
        <p className="apu_card_description">
          {`Unidad: ${equipment.equipment_unit}`}
        </p>
        <p className="apu_card_description">
          Costo ({equipment.equipment_unit}):{" "}
          {Formatter(equipment.equipment_unitary_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => addEquipment(equipment)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

function WorkHandCard({ workHand, addWorkHand }: WorkHandCard) {
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{workHand.workHand_name}</p>
        <p className="apu_card_description">
          {`Unidad: ${workHand.workHand_unit}`}
        </p>
        <p className="apu_card_description">
          Costo ({workHand.workHand_unit}):{" "}
          {Formatter(workHand.workHand_unitary_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => addWorkHand(workHand)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

function TransportationCard({
  transportation,
  addTransportation,
}: TransportationCard) {
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{transportation.transportation_name}</p>
        <p className="apu_card_description">
          {`Unidad: ${transportation.transportation_unit}`}
        </p>
        <p className="apu_card_description">
          Costo ({transportation.transportation_unit}):{" "}
          {Formatter(transportation.transportation_unitary_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => addTransportation(transportation)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

function ApuAdminCard({ apu, addApu }: AdminApuCard) {
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{apu.apu_name}</p>
        <p className="apu_card_description">{`Unidad: ${apu.apu_unit}`}</p>
        <p className="apu_card_description">
          Costo ({apu.apu_unit}): {Formatter(apu.apu_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span className="material-symbols-outlined" onClick={() => addApu(apu)}>
          add_box
        </span>
      </div>
    </div>
  );
}

export {
  MaterialCard,
  EquipmentCard,
  WorkHandCard,
  ApuAdminCard,
  TransportationCard,
};
