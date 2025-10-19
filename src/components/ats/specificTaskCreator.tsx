import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_SUBACTIVITY } from "../../assets/ats_queries/activity.mutation";
import SPECIFIC_TASK_MENU from "../../assets/info_json/specificTaskMenu.json";
import NEW_SPECIFIC_TASK from "../../utils/ats/mocks/newSpecificTask.json";
import ATSSubTask from "../../utils/ats/subtask";
import InputBox from "../inputElement";
import Toast from "../layout/toast";
import ActivitySelectBox from "./activitySelectBox";

export default function SpecificTaskCreator() {
  const SubTask = new ATSSubTask(NEW_SPECIFIC_TASK);
  const [selectedTask, setSelectedTask] = useState(10);
  const [newSubTask, setNewSubTask] = useState(SubTask.stateCopy);
  const [step, setStep] = useState("");
  const [potentialRisk, setPotentialRisk] = useState("");
  const [consequence, setConsequences] = useState("");
  const [controlMeasure, setControlMeasure] = useState("");
  const [saveSubTask, {loading, error, data}] = useMutation(CREATE_SUBACTIVITY, {refetchQueries: ["ActivitiesList"]})

  const [toast, setToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    title: "Titulo del toast",
    body: "Cuerpo del toast",
    footer: "Footer del toast",
    theme: "primary_theme",
  });

  const changeName = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    SubTask.subTask.name = evt.target.value;
    setNewSubTask(SubTask.stateCopy);
  }

  const handleChange = (section: Sections, index: number, newValue: boolean) => {
    SubTask.updateSection(section, index, newValue);
    setNewSubTask(SubTask.stateCopy);
  };

  const addItem = (element: SubTaskSection) => {
    if(element === "steps"){
      SubTask.subTask[element].push(step);
      setNewSubTask(SubTask.stateCopy);
    }
    if(element === "potentialRisks"){
      SubTask.subTask[element].push(potentialRisk);
      setNewSubTask(SubTask.stateCopy);
    }

    if(element === "consequences"){
      SubTask.subTask[element].push(consequence);
      setNewSubTask(SubTask.stateCopy);
    }

    if(element === "controlMeasures"){
      SubTask.subTask[element].push(controlMeasure);
      setNewSubTask(SubTask.stateCopy);
    }
  };

  const deleteItem = (section: SubTaskSection, index: number) => {
    SubTask.deleteElement(section, index);
    setNewSubTask(SubTask.stateCopy);
  };

  const save = () => {
    SubTask.subTaskToApi()
    saveSubTask({variables:{
      subActivityData: SubTask.subTaskToApi()
    }})
  }

  const handleParent = (evt: SelectType) => {
    const value = evt.value;
    SubTask.subTask.parent = value;
    setNewSubTask(SubTask.stateCopy);
  }

    useEffect(() => {
      if (loading) {
        setToastProps({
          title: "Creación de actividad",
          body: "Se está procesando la creación de la actividad",
          footer: "Exito",
          theme: "primary_theme",
        });
        setToast(true);
      }
      if (data) {
        setToastProps({
          title: "Creación de actividad",
          body: "Actividad creada con éxito",
          footer: "Exito",
          theme: "primary_theme",
        });
        setToast(true);
      }
      if (error) {
        setToastProps({
          title: "Creación de actividad",
          body: "Error creando la actividad",
          footer: "Exito",
          theme: "error_theme",
        });
        setToast(true);
      }
    }, [loading, error, data]);
 
  return (
    <div className="createTaskContainer">
      <Toast
              title={toastProps.title}
              body={toastProps.body}
              theme={toastProps.theme}
              footer={toastProps.footer}
              isActive={toast}
              setToast={setToast}
            />
      <div className="createTaskSidebar">
        <ul>
          {SPECIFIC_TASK_MENU.tasks.map((element) => (
            <li
              key={element.id}
              className={element.id === selectedTask ? "selected" : ""}
              onClick={() => {
                setSelectedTask(element.id);
              }}
            >
              {element.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="createTaskOptions">
        <div className={selectedTask === 10 ? "active" : "disabled"}>
          <h5>Creación nueva actividad</h5>
          <div className="newActivity">
          <InputBox inputName="name" isEmpty={false} labelTag="Nombre de la actividad" onChange={(evt)=>{changeName(evt)}} type="text" value={newSubTask.name} />
          <ActivitySelectBox handleSubtaskSelect={(evt)=>{handleParent(evt)}} isEmpty={false} label="Selecciona actividad a la que pertenece" name="task" value="0" />
          </div>
          <button className=" btnPrimary btnSmall">Siguiente</button>
        </div>
        <div className={selectedTask === 0 ? "active" : "disabled"}>
          <h5>Alrededores</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.surroundings.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    checked={item.isActive}
                    onChange={() => {
                      handleChange("surroundings", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 1 ? "active" : "disabled"}>
          <h5>Herramientas y equipos</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.equipmentAndTools.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    checked={item.isActive}
                    onChange={() => {
                      handleChange("equipmentAndTools", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 2 ? "active" : "disabled"}>
          <h5>EPP Requeridos</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.requiredEpp.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    onChange={() => {
                      handleChange("requiredEpp", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 3 ? "active" : "disabled"}>
          <h5>Riesgos identificados</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.identifiedRisks.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    checked={item.isActive}
                    onChange={() => {
                      handleChange("identifiedRisks", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 4 ? "active" : "disabled"}>
          <h5>Producto o material</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.productMaterial.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    checked={item.isActive}
                    onChange={() => {
                      handleChange("productMaterial", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 5 ? "active" : "disabled"}>
          <h5>Otros factores</h5>
          <div className="optionContainer grid col_sm_2">
            {newSubTask.riskIdentification.other.map((item, index) => {
              return (
                <div className="checkboxContainer" key={index}>
                  <input
                    type="checkbox"
                    id={item.option}
                    name="chemicals"
                    checked={item.isActive}
                    onChange={() => {
                      handleChange("other", index, item.isActive);
                    }}
                  />
                  <label htmlFor={item.option}>{item.option}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={selectedTask === 6 ? "active" : "disabled"}>
          <h5>Pasos de la tarea</h5>
          <div className="addInput">
            <InputBox
              inputName="steps"
              isEmpty={false}
              labelTag="Paso a paso de la tarea"
              onChange={(evt) => {
                setStep(evt.target.value);
              }}
              type="text"
              value={step}
            />
            <div className="buttonHome">
              <button type="button" className="btnSmall btnPrimary" onClick={()=>addItem("steps")}>
                Añadir
              </button>
            </div>
          </div>
          <p className="stepsTitle">Pasos a paso</p>
          <ol className="stepsList">
            {newSubTask.steps.map((step, index) => (
              <li>
                <div className="itemContainer">
                  <div className="name">{step}</div>
                  <div
                    className="deleteItem"
                    onClick={() => {
                      deleteItem("steps", index);
                    }}
                  >
                    x
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={selectedTask === 7 ? "active" : "disabled"}>
          <h5>Riesgos potenciales</h5>
          <div className="addInput">
            <InputBox
              inputName="potentialRisk"
              isEmpty={false}
              labelTag="Paso a paso de la tarea"
              onChange={(evt) => {
                setPotentialRisk(evt.target.value);
              }}
              type="text"
              value={potentialRisk}
            />
            <div className="buttonHome">
              <button type="button" className="btnSmall btnPrimary" onClick={()=>addItem("potentialRisks")}>
                Añadir
              </button>
            </div>
          </div>
          <p className="stepsTitle">Listado de riesgos potenciales</p>
          <ol className="stepsList">
            {newSubTask.potentialRisks.map((step, index) => (
              <li>
                <div className="itemContainer">
                  <div className="name">{step}</div>
                  <div
                    className="deleteItem"
                    onClick={() => {
                      deleteItem("potentialRisks", index);
                    }}
                  >
                    x
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={selectedTask === 8 ? "active" : "disabled"}>
          <h5>Consecuencias</h5>
          <div className="addInput">
            <InputBox
              inputName="consequence"
              isEmpty={false}
              labelTag="Paso a paso de la tarea"
              onChange={(evt) => {
                setConsequences(evt.target.value);
              }}
              type="text"
              value={consequence}
            />
            <div className="buttonHome">
              <button type="button" className="btnSmall btnPrimary" onClick={()=>addItem("consequences")}>
                Añadir
              </button>
            </div>
          </div>
          <p className="stepsTitle">Listado de consecuencias</p>
          <ol className="stepsList">
            {newSubTask.consequences.map((step, index) => (
              <li>
                <div className="itemContainer">
                  <div className="name">{step}</div>
                  <div
                    className="deleteItem"
                    onClick={() => {
                      deleteItem("consequences", index);
                    }}
                  >
                    x
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={selectedTask === 9 ? "active" : "disabled"}>
          <h5>Medidas de control</h5>
          <div className="addInput">
            <InputBox
              inputName="controlMeasures"
              isEmpty={false}
              labelTag="Medidas de control"
              onChange={(evt) => {
                setControlMeasure(evt.target.value);
              }}
              type="text"
              value={controlMeasure}
            />
            <div className="buttonHome">
              <button type="button" className="btnSmall btnPrimary" onClick={()=>addItem("controlMeasures")}>
                Añadir
              </button>
            </div>
          </div>
          <p className="stepsTitle">Listado de medidas de control</p>
          <ol className="stepsList">
            {newSubTask.controlMeasures.map((step, index) => (
              <li>
                <div className="itemContainer">
                  <div className="name">{step}</div>
                  <div
                    className="deleteItem"
                    onClick={() => {
                      deleteItem("controlMeasures", index);
                    }}
                  >
                    x
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={selectedTask === 11 ? "active" : "disabled"}>
          <h5>Guardar nueva actividad</h5>
            <button className="btn btnSmall btnPrimary" onClick={()=>{save()}}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
