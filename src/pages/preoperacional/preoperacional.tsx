import { useState } from "react";
import CideinLayout from "../../components/cidein_layout";
import Grid from "../../components/layout/grid";
import MainNavbar from "../../components/layout/mainNavbar";
import SecondaryNavbar from "../../components/layout/secondaryNavbar";
import MachineImageContainer from "./machineImageContainer";

type Element = {
  file: string,
  x: string,
  y: string,
  title: string,
  checks: string[]
}
export default function Preoperational() {
  const [selectedElement, setSelectedElement] = useState<Element>({
    "file": "cabina_bottom.png",
    "x": "53.9%",
    "y": "49.7%",
    "title": "",
    checks: []
  })
  return (
    <CideinLayout>
      <Grid gap={12} sm={2} md={2} lg={2} def={1} className="col_lg_sp_8 my_12">
        <MainNavbar />
        <div style={{height: "100vh"}}>
          <p>Preoperacional</p>
          <div className="machine_container" style={{border: "solid black"}}>
          
        </div>
        <p>Minicargador</p>
        </div>
        <div className="slectedElement">
          <p>{selectedElement.title}</p>
          <div>
            {selectedElement.checks.map((check, index)=>{
              return(
                <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={check} name="chemicals" />
                        <label htmlFor={check}>{check}</label>
                      </div>
              )
            })}
          </div>
        </div>
      </Grid>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_4 my_12">
        <SecondaryNavbar />
      </Grid>
    </CideinLayout>
  );
}
