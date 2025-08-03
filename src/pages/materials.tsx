import { useQuery } from "@apollo/client";
import { useState } from "react";
import CideinLayout from "../components/cidein_layout";
import MaterialWindow1 from "../components/material_window_1";
import MaterialWindow2 from "../components/material_window_2";

//QUERIES

export default function Materials() {
  const [activeWindow, setActiveWindow] = useState("material_window_2");
  let renderedWindow: JSX.Element = <></>;
  if (activeWindow === "material_window_1") {
    renderedWindow = <div></div>;
  }

  if (activeWindow === "material_window_2") {
    renderedWindow = <MaterialWindow2 />;
  }
  return (
    <CideinLayout>
      <div className="grid col_sm_3 gap_sm_12">
        {renderedWindow}
        <div>
          <div className="add_container my_sm_16">
            <form className="cidein_form_single">
              <div className="form_input_container">
                <label htmlFor="material_name">NOMBRE DEL MATERIAL</label>
                <input
                  type="text"
                  placeholder="Nombre del material"
                  id="material_name"
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_unit">UNIDAD</label>
                <input type="text" placeholder="Unidad" id="material_unit" />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_rud">RUD</label>
                <input type="text" placeholder="Unidad" id="material_rud" />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_unitary_price">PRECIO UNITARIO</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_unitary_price"
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_code">CÓDIGO</label>
                <input type="text" placeholder="Unidad" id="material_code" />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_category">CATEGORÍA</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_category"
                />
              </div>
              <div className="form_input_container">
                <label htmlFor="material_provider">PROVEEDOR</label>
                <input
                  type="text"
                  placeholder="Unidad"
                  id="material_provider"
                />
              </div>
              <button className="btn secondary_theme my_sm_16">Guardar</button>
            </form>
          </div>
        </div>
      </div>
      <div className="bottom_options_nav">
        <div className="bottom_nav_container">
          <ul>
            <li>
              <div className="bottom_nav_icon">
                <span
                  className="material-symbols-outlined no_select"
                  onClick={() => setActiveWindow("material_window_2")}
                >
                  upload_file
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </CideinLayout>
  );
}
