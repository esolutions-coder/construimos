import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {
  GET_MATERIAL_BY_CODE,
  UPDATE_MATERIAL,
} from "../assets/apus_queries/materialsQueries";
import CideinLayout from "../components/cidein_layout";
import QueryResult from "../components/QueryResult";
import Formatter from "../utils/formatter";

type MaterialFormReducer = {
  state: CIDEINMaterials;
  action:
    | {
        type: "change_value";
        payload: {
          input_name: string;
          input_value: string;
        };
      }
    | {
        type: "fill_data";
        payload: {
          fullData: CIDEINMaterials;
        };
      };
};

let initialState = {
  _id: "",
  material_name: "",
  material_unitary_price: 0,
  material_provider: "",
  material_code: "",
  material_amount: 0,
  material_unit: "",
  material_rud: 0,
  material_partial_value: 0,
  material_category: "",
};

function MaterialInfo() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_MATERIAL_BY_CODE, {
    variables: {
      materialCode: id,
    },
  });

  const [updateMaterial, updateMaterialResponse] = useMutation(UPDATE_MATERIAL);

  useEffect(() => {
    if (data?.materialByCode) {
      dispatch({
        type: "fill_data",
        payload: {
          fullData: data?.materialByCode,
        },
      });
    }
  }, [data]);

  const reducer = (
    state: MaterialFormReducer["state"],
    action: MaterialFormReducer["action"]
  ) => {
    switch (action.type) {
      case "change_value":
        const input_name = action.payload.input_name;
        const input_value = action.payload.input_value;
        return { ...state, [input_name]: input_value };
      case "fill_data":
        const materialFromDb = action.payload.fullData;
        return { ...materialFromDb };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input_name = evt.target.name;
    const input_value = evt.target.value;
    dispatch({
      type: "change_value",
      payload: {
        input_name,
        input_value,
      },
    });
  };

  useEffect(() => {
    if (updateMaterialResponse.loading) {
      console.log("CAMBIO HECHO");
    }
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const {
      _id,
      material_name,
      material_category,
      material_rud,
      material_code,
      material_unitary_price,
      material_unit,
      material_provider,
    } = state;

    const parsedRud = parseFloat(material_rud.toString());
    const parsedUnitaryPrice = parseFloat(material_unitary_price.toString());

    const updatedMaterial = {
      editMaterialId: _id,
      materialData: {
        material_name,
        material_category,
        material_rud: parsedRud,
        material_code,
        material_unitary_price: parsedUnitaryPrice,
        material_unit,
        material_provider,
      },
    };

    updateMaterial({
      variables: {
        ...updatedMaterial,
      },
    });
  };
  return (
    <CideinLayout>
      <div className="grid col_sm_3 gap_sm_12">
        <div className="span_sm_2 my_sm_16">
          <QueryResult
            loading={loading}
            error={error}
            data={data}
            searchName={"materialByCode"}
          >
            <h1>{state.material_name}</h1>
            <p className="txt_left">Categoría: {state.material_category}</p>
            <p className="txt_left">Proveedor: {state.material_provider}</p>
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
                    <td>{state.material_code}</td>
                    <td>{state.material_unit}</td>
                    <td>{state.material_rud * 100}%</td>
                    <td>{Formatter(state.material_unitary_price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </QueryResult>
        </div>
        <div className="span_sm_1">
          <div className="add_container my_sm_16">
            <form className="cidein_form_single" onSubmit={handleSubmit}>
              <div className="form_input_container">
                <label htmlFor="material_name">NOMBRE DEL MATERIAL</label>
                <input
                  type="text"
                  placeholder="Nombre del material"
                  id="material_name"
                  name="material_name"
                  value={state.material_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_unit">UNIDAD</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_unit"
                  name="material_unit"
                  value={state.material_unit}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_rud">RUD</label>
                <input
                  type="number"
                  placeholder="Rendimientos / Desperdicio"
                  id="material_rud"
                  name="material_rud"
                  value={state.material_rud}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_unitary_price">PRECIO UNITARIO</label>
                <input
                  type="number"
                  placeholder="Precio unitario"
                  id="material_unitary_price"
                  name="material_unitary_price"
                  value={state.material_unitary_price}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_code">CÓDIGO</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_code"
                  disabled={true}
                  value={state.material_code}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_category">CATEGORÍA</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_category"
                  name="material_category"
                  value={state.material_category}
                  onChange={handleChange}
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_provider">PROVEEDOR</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_provider"
                  name="material_provider"
                  value={state.material_provider}
                  onChange={handleChange}
                />
              </div>
              <button className="btn secondary_theme my_sm_16">
                ACTUALIZAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </CideinLayout>
  );
}

export default MaterialInfo;
