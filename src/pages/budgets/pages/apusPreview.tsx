import { ApolloError, OperationVariables } from "@apollo/client";
import QueryResult from "../../../components/QueryResult";
import Formatter from "../../../utils/formatter";

type ApusPreviewProps = {
    //@ts-ignore
    GetFullApuResponse: QueryResult<any, OperationVariables>
    selectedApu: APU
}

export default function ApusPreview({GetFullApuResponse, selectedApu}: ApusPreviewProps) {
    return(
        <div className="cidein_window_2">
              <QueryResult
                loading={GetFullApuResponse.loading}
                error={GetFullApuResponse.error}
                data={GetFullApuResponse.data}
                searchName="apu"
              >
                <div className="apu_description my_sm_16">
                  <h5>{selectedApu.apu_name}</h5>
                  <p className="txt_left body_1">
                    {selectedApu.apu_description}
                  </p>
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
                    <tbody>
                      {selectedApu.apu_materials.map((material, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{material.material_code}</td>
                            <td>{material.material_name}</td>
                            <td>{material.material_unit}</td>
                            <td>{material.material_amount}</td>
                            <td>
                              {Formatter(material.material_unitary_price)}
                            </td>
                            <td>{material.material_rud}</td>
                            <td>
                              {Formatter(material.material_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_equipment.map((equipment, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{equipment.equipment_code}</td>
                            <td>{equipment.equipment_name}</td>
                            <td>{equipment.equipment_unit}</td>
                            <td>{equipment.equipment_amount}</td>
                            <td>
                              {Formatter(equipment.equipment_unitary_price)}
                            </td>
                            <td>{equipment.equipment_rud}</td>
                            <td>
                              {Formatter(equipment.equipment_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_workHand.map((workHand, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{workHand.workHand_code}</td>
                            <td>{workHand.workHand_name}</td>
                            <td>{workHand.workHand_unit}</td>
                            <td>{workHand.workHand_amount}</td>
                            <td>
                              {Formatter(workHand.workHand_unitary_price)}
                            </td>
                            <td>{workHand.workHand_rud}</td>
                            <td>
                              {Formatter(workHand.workHand_partial_value)}
                            </td>
                          </tr>
                        );
                      })}
                      {selectedApu.apu_transportation.map(
                        (transport, index) => {
                          return (
                            <tr className="subActivity_row" key={index}>
                              <td>{transport.transportation_code}</td>
                              <td>{transport.transportation_name}</td>
                              <td>{transport.transportation_unit}</td>
                              <td>{transport.transportation_amount}</td>
                              <td>
                                {Formatter(
                                  transport.transportation_unitary_price
                                )}
                              </td>
                              <td>{transport.transportation_rud}</td>
                              <td>
                                {Formatter(
                                  transport.transportation_partial_value
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                      {selectedApu.apu_apu.map((apu, index) => {
                        return (
                          <tr className="subActivity_row" key={index}>
                            <td>{apu.apu_id}</td>
                            <td>{apu.apu_name}</td>
                            <td>{apu.apu_unit}</td>
                            <td>{apu.apu_amount}</td>
                            <td>{Formatter(apu.apu_price)}</td>
                            <td>{apu.apu_rud}</td>
                            <td>{Formatter(apu.apu_partial_value)}</td>
                          </tr>
                        );
                      })}
                      <tr className="subtotal_activity">
                        <td colSpan={2}>Subtotal APU</td>
                        <td colSpan={5} className="subtotal_price">
                          {Formatter(selectedApu.apu_price)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </QueryResult>
            </div>
    )
}