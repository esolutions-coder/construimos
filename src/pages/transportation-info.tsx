import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_TRANSPORTATION_BY_CODE } from "../assets/apus_queries/transportation.queries";
import CideinLayout from "../components/cidein_layout";
import QueryResult from "../components/QueryResult";
import Formatter from "../utils/formatter";

function TransportationInfo() {
  let { code } = useParams();
  const { loading, error, data } = useQuery(GET_TRANSPORTATION_BY_CODE, {
    variables: {
      code,
    },
  });
  return (
    <CideinLayout>
      <div className="grid col_sm_3 gap_sm_12">
        <div className="span_sm_2 my_sm_16">
          <QueryResult
            loading={loading}
            error={error}
            data={data}
            searchName={"transportationByCode"}
          >
            <input
              type="text"
              className="title_input my_sm_16"
              value={data?.transportationByCode?.transportation_name}
              placeholder="Nombre del material"
            />
            <p className="txt_left">
              Categoría: {data?.transportationByCode?.transportation_category}
            </p>
            <p className="txt_left">
              Proveedor: {data?.transportationByCode?.transportation_provider}
            </p>
            <div className="table_container my_sm_16">
              <table className="cidein_table">
                <thead>
                  <tr>
                    <td className="border_top_left">Código</td>
                    <td>Unidad</td>
                    <td>Rendimiento</td>
                    <td className="border_top_right">Valor unitario</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="subActivity_row">
                    <td>{data?.transportationByCode?.transportation_code}</td>
                    <td>{data?.transportationByCode?.transportation_unit}</td>
                    <td>
                      {data?.transportationByCode?.transportation_rud * 100}%
                    </td>
                    <td>
                      {Formatter(
                        data?.transportationByCode?.transportation_unitary_price
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </QueryResult>
        </div>
        <div className="span_sm_1"></div>
      </div>
    </CideinLayout>
  );
}

export default TransportationInfo;
