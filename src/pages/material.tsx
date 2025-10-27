import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MATERIAL_BY_ID } from "../assets/apus_queries/materialsQueries";
import Sidebar from "../components/layout/sidebar";
import Materiales from "../utils/materials/controllers/material.controller";
import Loading from "../components/loading";
import MATERIAL_MOCK from "../utils/materials/mocks/old_material.json";

let MaterialController = new Materiales([MATERIAL_MOCK]); //Estas clases son de Miguel

export default function MaterialById() {
  const { materialId } = useParams();

  const { loading, error, data } = useQuery(GET_MATERIAL_BY_ID, {
    variables: { materialId },
  }); // Las Queries y Mutations son de Miguel, te las entrego con sus parametros ya definidos

  const [material, setMaterial] = useState(MaterialController.getState());

  useEffect(() => {
    if (data) {
      MaterialController.material = JSON.parse(JSON.stringify(data.material));
      setMaterial(MaterialController.getState());
    }
    if (error) {
      <div>Hubo un error</div>;
    }
    if (loading) {
      <div>
        <Loading />
      </div>;
    }
  }, [data]);

  return (
    <div className="material-details">
      <Sidebar />
      {/* <img src={material.image} alt={material.image} className="material-image" /> */}

      <div className="material-header">
        <h1 className="materititulo">MATERIALES</h1>

        <div className="material-info">
          <h1 className="material-title">{material.material_name}</h1>
          {/* <Rating material={material} /> */}
          <span className="material-price">
            ${material.material_unitary_price}
          </span>
          <p className="material-description-title">Descripción</p>
          {/* <p className="material-description">{material.description}</p> */}
          <div className="tech-sheet">
            <h2 className="tech-sheet-title">FICHA TÉCNICA</h2>
            {/* <table className="tech-sheet-table">
              {material.map((item, index) => {
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{item.prop}</td>
                      <td>{item.value}</td>
                      <td>{item.pinturaacaba}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}
