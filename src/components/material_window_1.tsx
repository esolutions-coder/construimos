import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_MATERIALS } from "../assets/apus_queries/materialsQueries";
import QueryResult from "./QueryResult";

export default function MaterialWindow1() {
  const { loading, error, data } = useQuery(ALL_MATERIALS);
  const [materialList, setMaterialList] = useState<CIDEINMaterials[]>([
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
  useEffect(() => {
    if (data) {
      setMaterialList(data.materials);
    }
  }, [data]);

  return (
    <div className="material_window_1 span_sm_2 my_sm_16">
      <div className="table_container">
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
            <QueryResult
              data={data}
              error={error}
              loading={loading}
              searchName="materials"
            >
              {materialList.map((material) => {
                return (
                  <tr className="subActivity_row">
                    <td>{material.material_code}</td>
                    <td>{material.material_name}</td>
                    <td>{material.material_unit}</td>
                    <td>{material.material_rud}</td>
                    <td>{material.material_unitary_price}</td>
                    <td>{material.material_provider}</td>
                  </tr>
                );
              })}
            </QueryResult>
          </tbody>
        </table>
      </div>
    </div>
  );
}
