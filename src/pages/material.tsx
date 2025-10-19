import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Materiales from "../utils/materials/controllers/material.controller";
import MATERIAL_MOCK from "../utils/materials/mocks/material.json";
import { GET_MATERIAL_BY_ID } from "../assets/apus_queries/materialsQueries";
import Sidebar from "../components/layout/sidebar";
import "../assets/styles/_materials.scss";
import Rating from "../components/rating";

let MaterialController = new Materiales([MATERIAL_MOCK]);

export default function MaterialById() {
  const { materialId } = useParams();

  const { loading, error, data } = useQuery(GET_MATERIAL_BY_ID, {
    variables: { materialId },
  });

  const [material, setMaterial] = useState(MaterialController.getState());

  useEffect(() => {
    if (data) {
      MaterialController.material = data.getMaterialById;
      setMaterial(MaterialController.getState());
    }
    if (error) {
      <div>Hubo un error</div>;
    }
    if (loading) {
      <div>Cargando....</div>;
    }
  }, [data]);

  return (
    <div className="material-details">
      <Sidebar />
      <h1 className="materititulo">MATERIALES</h1>
      <img
        src={material.image}
        alt={material.image}
        className="material-image"
      />

      <div className="material-header">
        <div className="material-info">
          <h1 className="material-title">{material.name}</h1>
          <Rating material={material} />
          <span className="material-price">${material.price}</span>
          <p className="material-description-title">Descripción</p>
          <p className="material-description">{material.description}</p>
          <div className="tech-sheet">
            <h2 className="tech-sheet-title">FICHA TÉCNICA</h2>
            <table className="tech-sheet-table">
              {material.tech_sheet.map((item, index) => {
                return (
                  <tr>
                    <td>{item.prop}</td>
                    <td>{item.value}</td>
                    <td>{item.pinturaacaba}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
