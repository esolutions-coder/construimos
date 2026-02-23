import Formatter from "../utils/formatter";

interface AdminApuTableProps {
  MaterialOptions: {
    apuMaterials: CIDEINMaterials[];
    updateMaterialAmount: Function;
  };
  TransportationOptions: {
    apuTransportation: CIDEINTransportation[];
    updateTransportationAmount: Function;
  };
  EquipmentOptions: {
    apuEquipment: CIDEINEquipment[];
    updateEquipmentAmount: Function;
  };
  WorkHandOptions: {
    apuWorkHand: CIDEINWorkhand[];
    updateWorkHandAmount: Function;
  };
  ApuApuOptions: {
    apuApu: CIDEINAPU[];
    updateApuAmount: Function;
    updateApuRud: Function;
  };
  DeleteOptions: {
    deleteApuItem: Function;
  };
  ApuPrice: number;
}

export default function AdminApuTable({
  MaterialOptions,
  EquipmentOptions,
  WorkHandOptions,
  ApuApuOptions,
  TransportationOptions,
  ApuPrice,
  DeleteOptions,
}: AdminApuTableProps) {
  
    let finalPrice = MaterialOptions.apuMaterials.reduce((acc, material) => acc + material.material_partial_value, 0);
    finalPrice += TransportationOptions.apuTransportation.reduce((acc, transportation) => acc + transportation.transportation_partial_value, 0);
    finalPrice += EquipmentOptions.apuEquipment.reduce((acc, equipment) => acc + equipment.equipment_partial_value, 0);
    finalPrice += WorkHandOptions.apuWorkHand.reduce((acc, workHand) => acc + workHand.workHand_partial_value, 0);
    finalPrice += ApuApuOptions.apuApu.reduce((acc, apu) => acc + apu.apu_partial_value, 0);

  if (
    MaterialOptions.apuMaterials.length === 0 &&
    TransportationOptions.apuTransportation.length === 0 &&
    EquipmentOptions.apuEquipment.length === 0 &&
    WorkHandOptions.apuWorkHand.length === 0 &&
    ApuApuOptions.apuApu.length === 0
  ) {

    return (
      <tbody>
        <tr>
          <td colSpan={7}>
            <p>
              Tu APU está vacío, ¿necesitas ayuda? mira la{" "}
              <a href="/apu-docs">documentación</a>
            </p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        {MaterialOptions.apuMaterials.map((material) => (
          <tr className="subActivity_row" key={material.material_code}>
            <td>{material.material_code}</td>
            <td>{material.material_name}</td>
            <td>{material.material_unit}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={material.material_amount}
                onChange={(evt) =>
                  MaterialOptions.updateMaterialAmount(
                    evt,
                    material.material_code
                  )
                }
              />
            </td>
            <td>{Formatter(material.material_unitary_price)}</td>
            <td>{material.material_rud}</td>
            <td>
              <div className="subActivity_options">
                {Formatter(material.material_partial_value)}
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    DeleteOptions.deleteApuItem("MAT", material.material_code)
                  }
                >
                  cancel
                </span>
              </div>
            </td>
          </tr>
        ))}
        {EquipmentOptions.apuEquipment.map((equipment) => (
          <tr className="subActivity_row" key={equipment.equipment_code}>
            <td>{equipment.equipment_code}</td>
            <td>{equipment.equipment_name}</td>
            <td>{equipment.equipment_unit}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={equipment.equipment_amount}
                onChange={(evt) =>
                  EquipmentOptions.updateEquipmentAmount(
                    evt,
                    equipment.equipment_code
                  )
                }
              />
            </td>
            <td>{Formatter(equipment.equipment_unitary_price)}</td>
            <td>{equipment.equipment_rud}</td>
            <td>
              <div className="subActivity_options">
                {Formatter(equipment.equipment_partial_value)}
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    DeleteOptions.deleteApuItem("EQP", equipment.equipment_code)
                  }
                >
                  cancel
                </span>
              </div>
            </td>
          </tr>
        ))}
        {WorkHandOptions.apuWorkHand.map((workHand) => (
          <tr className="subActivity_row" key={workHand.workHand_code}>
            <td>{workHand.workHand_code}</td>
            <td>{workHand.workHand_name}</td>
            <td>{workHand.workHand_unit}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={workHand.workHand_amount}
                onChange={(evt) =>
                  WorkHandOptions.updateWorkHandAmount(
                    evt,
                    workHand.workHand_code
                  )
                }
              />
            </td>
            <td>{Formatter(workHand.workHand_unitary_price)}</td>
            <td>{workHand.workHand_rud}</td>
            <td>
              <div className="subActivity_options">
                {Formatter(workHand.workHand_partial_value)}
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    DeleteOptions.deleteApuItem("MDO", workHand.workHand_code)
                  }
                >
                  cancel
                </span>
              </div>
            </td>
          </tr>
        ))}
        {TransportationOptions.apuTransportation.map((transportation) => (
          <tr
            className="subActivity_row"
            key={transportation.transportation_code}
          >
            <td>{transportation.transportation_code}</td>
            <td>{transportation.transportation_name}</td>
            <td>{transportation.transportation_unit}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={transportation.transportation_amount}
                onChange={(evt) =>
                  TransportationOptions.updateTransportationAmount(
                    evt,
                    transportation.transportation_code
                  )
                }
              />
            </td>
            <td>{Formatter(transportation.transportation_unitary_price)}</td>
            <td>{transportation.transportation_rud}</td>
            <td>
              <div className="subActivity_options">
                {Formatter(transportation.transportation_partial_value)}
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    DeleteOptions.deleteApuItem(
                      "TPT",
                      transportation.transportation_code
                    )
                  }
                >
                  cancel
                </span>
              </div>
            </td>
          </tr>
        ))}
        {ApuApuOptions.apuApu.map((apu) => (
          <tr className="subActivity_row" key={apu.apu_id}>
            <td>{apu.apu_id}</td>
            <td>{apu.apu_name}</td>
            <td>{apu.apu_unit}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={apu.apu_amount}
                onChange={(evt) =>
                  ApuApuOptions.updateApuAmount(evt, apu.apu_id)
                }
              />
            </td>
            <td>{Formatter(apu.apu_price)}</td>
            <td>
              <input
                type="number"
                className="table_input editable_input"
                value={apu.apu_rud}
                onChange={(evt) => ApuApuOptions.updateApuRud(evt, apu.apu_id)}
              />
            </td>
            <td>
              <div className="subActivity_options">
                {Formatter(apu.apu_partial_value)}
                <span
                  className="material-symbols-outlined"
                  onClick={() => DeleteOptions.deleteApuItem("APU", apu.apu_id)}
                >
                  cancel
                </span>
              </div>
            </td>
          </tr>
        ))}
        <tr className="subtotal_activity">
          <td colSpan={2}>Subtotal APU</td>
          <td colSpan={5} className="subtotal_price">
            {Formatter(finalPrice)}
          </td>
        </tr>
      </tbody>
    );
  }
}
