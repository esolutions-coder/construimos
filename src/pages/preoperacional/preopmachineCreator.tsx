import { CSSProperties, useRef, useState } from "react";
import Select from "react-select";
import CideinLayout from "../../components/cidein_layout";
import InputBox from "../../components/inputElement";
import AccordeonCard from "../../components/layout/accordeon";
import Grid from "../../components/layout/grid";
import HandfulBar from "../../components/layout/AtshandfultBar";
import MainNavbar from "../../components/layout/mainNavbar";
import SecondaryNavbar from "../../components/layout/secondaryNavbar";
import useMousePosition from "../../hooks/useMousePosition";
import PREOP_CATS from "../../mocks/preoperacional_cats.json";
import WORKERS from "../../mocks/workers.json";
import Machine, { Dot } from "../../utils/preoperacional/controllers/machine";
import MachineMock from "../../utils/preoperacional/mocks/machine.json";
import { preopSelectStyle, selectStyles } from "../../settings/selectStyles";

export default function PreopMachineCreator() {
  const dot = {
    size: 20,
    container: 60,
  };


  const MachineController = new Machine(MachineMock);

  const mousePosition = useMousePosition();
  const imgRef = useRef<HTMLImageElement>(null);
  const [machine, setMachine] = useState(MachineController.stateCopy);
  const [selectedElement, setSelectedElement] = useState<Dot>();

  const [newChecklistItem, setNewChecklistItem] = useState("");

  const [file, setFile] = useState<string>();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleCheckListItem = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = evt.target.value;
    setNewChecklistItem(value);
  };

  const handleForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (selectedElement) {
      MachineController.addItemToDot(selectedElement.id, newChecklistItem);
      setNewChecklistItem("");
      setSelectedElement(MachineController.selectDot(selectedElement.id));
      setMachine(MachineController.stateCopy);
    }
  };

  const handleTitle = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = evt.target.value;
    MachineController.info.title = value;
    setMachine(MachineController.stateCopy);
  };

  const handleDotTitle = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = evt.target.value;
    if (selectedElement) {
      MachineController.dotTitle(selectedElement.id, value), setMachine(MachineController.stateCopy);
    }
  };

  const getCoords = () => {
    if (imgRef.current) {
      const bounds = imgRef.current.getBoundingClientRect();
      if (mousePosition.x && mousePosition.y) {
        const x = `${mousePosition.x - bounds.left - dot.container / 2}px`;
        const y = `${mousePosition.y - bounds.top - dot.size + 20}px`;
        let newOnes = { x, y, title: "", checks: [], id: `${Date.now()}`, isActive: false };
        MachineController.addDots(JSON.parse(JSON.stringify(newOnes)));
        setMachine(MachineController.stateCopy);
      }
    }
  };

  const selectDot = (dotId: string) => {
    let selectedDot = MachineController.selectDot(dotId);
    if (selectedDot) {
      selectedDot.isActive = true;
      setSelectedElement(selectedDot);
      setMachine(MachineController.stateCopy);
    }
  };

  const deleteDot = (dotId: string) => {
    MachineController.deleteDot(dotId);
    setMachine(MachineController.stateCopy);
  };

  const workerOptions = WORKERS.workers.map((worker) => {
    return {
      label: worker.name,
      value: worker._id,
    };
  });

  return (
    <CideinLayout>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_12 handfulbarContainer">
        <HandfulBar />
      </Grid>
      <Grid gap={12} sm={2} md={2} lg={2} def={1} className="col_lg_sp_8 ml_12">
        <MainNavbar />
        <div>
          <p>Preoperacional</p>
          <div className="imageContainer">
            {machine.dots.length > 0 ? (
              machine.dots.map((points, index) => {
                return (
                  <div
                    style={{ top: points.y, left: points.x, width: dot.container, height: dot.container }}
                    className="points"
                    onClick={() => {
                      selectDot(points.id);
                    }}
                  >
                    <span className={`material-symbols-outlined shiny ${points.isActive ? "active" : ""}`} style={{ fontSize: dot.size }}>
                      radio_button_checked
                    </span>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}

            <input type="file" onChange={handleChange} />
            <img src={file} ref={imgRef} onClick={getCoords} />
          </div>
          <div>
            {/* <div className="inputContainer">
              <label htmlFor="type">Tipo de maquinaria</label>
                <Select options={PREOP_CATS.categories} id="type" placeholder={"Seleccione Tipo de maquinaria"} styles={preopSelectStyle} onChange={
                  (evt: SelectType)=>{
                    MachineController.info.type = evt.value
                    setMachine(MachineController.stateCopy)
                  }
                }/>
              </div> */}
          </div>
        </div>
        <div className="selectedElement">
          <InputBox
            inputName="title"
            isEmpty={false}
            labelTag="Nombre del ítem"
            onChange={handleDotTitle}
            type="text"
            value={selectedElement ? selectedElement.title : ""}
            className="col_lg_sp_2"
            placeholder="Ingrese el nombre del elemento"
          />
          <form onSubmit={handleForm}>
            <InputBox
              inputName="itemTitle"
              isEmpty={false}
              labelTag="Ingresa item a verificar"
              onChange={handleCheckListItem}
              type="text"
              value={newChecklistItem}
              className="col_lg_sp_2"
            />
            <button className="primary_theme btn my_12" type="submit">
              Agregar item a checklist
            </button>
          </form>
          <div style={{ paddingTop: 12 }}>
            {machine.dots.map((dot) => {
              return (
                <AccordeonCard
                  action={() => {
                    selectDot(dot.id);
                  }}
                  icon="visibility"
                  key={dot.id}
                  name={dot.title}
                  list={dot.checks}
                  auxiliarAction={() => {
                    deleteDot(dot.id);
                  }}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              console.log(MachineController.info);
            }}
            className="btn primary_theme"
          >
            Guardar Preoperacional
          </button>
        </div>
      </Grid>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_4 mr_12">
        <SecondaryNavbar />
        <div>
          <p>Ficha tecnica</p>
          <InputBox
              inputName="title"
              isEmpty={false}
              labelTag="Nombre de la máquina / herramienta"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
            <InputBox
              inputName="brand"
              isEmpty={false}
              labelTag="Marca"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
            <InputBox
              inputName="model"
              isEmpty={false}
              labelTag="Modelo"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
            <InputBox
              inputName="motor"
              isEmpty={false}
              labelTag="Motor"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
            <InputBox
              inputName="hydraulic_bomb"
              isEmpty={false}
              labelTag="Bomba hidráulica"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
            <InputBox
              inputName="transmision"
              isEmpty={false}
              labelTag="Transmisión"
              onChange={handleTitle}
              type="text"
              value={machine.title}
              className="col_lg_sp_2"
            />
        </div>
      </Grid>
    </CideinLayout>
  );
}
