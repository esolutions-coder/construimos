import { useQuery } from "@apollo/client";
import { useState } from "react";
import CideinLayout from "../components/cidein_layout";
import MaterialWindow1 from "../components/material_window_1";
import MaterialWindow2 from "../components/material_window_2";
import AddMaterialForm from "./budgets/forms/addMaterialForm";

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
          <AddMaterialForm />
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
