import { useState } from "react";
import Select, { SingleValue } from "react-select";
import CONST_LOGO from "../../assets/img/cidein_logo.png";
import ActivitySelectBox from "../../components/ats/activitySelectBox";
import SpecificTaskCreator from "../../components/ats/specificTaskCreator";
import WorkerInfoBox from "../../components/ats/workerInfoBox";
import CideinLayout from "../../components/cidein_layout";
import InputBox from "../../components/inputElement";
import AtsHandfulBar from "../../components/layout/AtshandfultBar";
import Grid from "../../components/layout/grid";
import MainNavbar from "../../components/layout/mainNavbar";
import Modal from "../../components/layout/modal";
import SecondaryNavbar from "../../components/layout/secondaryNavbar";
import ATS_MOCK_DATA from "../../mocks/ats.json";
import TASKS from "../../mocks/specificActivity.json";
import WORKERS from "../../mocks/workers.json";
import { selectStyles } from "../../settings/selectStyles";
import ATS from "../../utils/ats/ats";
import WORKER_INFO from "../../utils/ats/workerInfo.json";
import CreateActivity from "./createActivity";
import SubActivitySelectBoxByParent from "../../components/ats/subActivitySelectByParent";

type SelectType = SingleValue<{
  value: string;
  label: string;
}>;

export default function AtsEditor() {
  const ATS_CONTROLL = new ATS(ATS_MOCK_DATA);

  const [ATS_INFO, setATS_INFO] = useState(ATS_CONTROLL.stateCopy);
  const [newWorker, setNewWorker] = useState(ATS_CONTROLL.ats.workers[0]);
  const [selectedWorker, setSelectedWorker] = useState({
    _id: "4685",
    name: "SOFIA CASTRO VARGAS",
    cc: 1234567891,
    arl: "Colmena",
    eps: "Nueva eps",
    img: "./images/jane5.png",
  });

  const [currentActivity, setCurrentActivy] = useState("NOT_DEFINED");

  const [modal, setModal] = useState(false);

  const [subtaskModal, setSubtaskModal] = useState(false);

  const workerOptions = WORKERS.workers.map((worker) => {
    return {
      label: worker.name,
      value: worker._id,
    };
  });


  const handleCurrentActivity  = (evt: SelectType) => {
    if(evt){
      setCurrentActivy(evt.value)
    }
  }

  const handleNewWorker = (evt: SelectType) => {
    const workerId = evt?.value;
    const workerIndex = WORKERS.workers.findIndex((worker) => worker._id === workerId);
    const workerInfo = WORKERS.workers[workerIndex];
    setNewWorker(workerInfo);
  };

  const addNewWorker = () => {
    ATS_CONTROLL.ats.workers.push(newWorker);
    setATS_INFO(ATS_CONTROLL.stateCopy);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setNewWorker((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleInput = (section: Sections, index: number, newValue: boolean) => {
    ATS_CONTROLL.updateSection(section, index, newValue);
    setATS_INFO(ATS_CONTROLL.stateCopy);
  };

  return (
    <CideinLayout>
      <Modal modal={modal} setModal={setModal}>
        <CreateActivity/>
      </Modal>
      {/* Subtask */}
      <Modal modal={subtaskModal} setModal={setSubtaskModal}>
      <SpecificTaskCreator />
      </Modal>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_12 handfulbarContainer">
        <AtsHandfulBar states={[()=>{setModal(true)}, ()=>{setSubtaskModal(true)}]}/>
      </Grid>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_9 my_12">
        <MainNavbar />
        <div className="col_s2 ats_container">
          <div className="atsContainer">
            <div className="row_lg_sp_4 allBorder">
              <img src={CONST_LOGO} alt="Business logo" className="atsLogo" />
            </div>

            <div className="col_lg_sp_6 row_lg_sp_3 allBorder flex xAlign yAlign atsTitle" style={{ backgroundColor: ATS_INFO.titleColor }}>
              ANÁLISIS DE TRABAJO SEGURO
            </div>

            <div className="allBorder flex yAlign">CÓDIGO</div>
            <div className="allBorder flex yAlign">HSEQ-01</div>
            <div className="allBorder flex yAlign">Versión</div>
            <div className="allBorder flex yAlign">001</div>
            <div className="allBorder flex yAlign">Páginas</div>
            <div className="allBorder flex yAlign">1 DE 2</div>

            <div className="col_lg_sp_3 allBorder">PROYECTO</div>
            <div className="col_lg_sp_2 allBorder">FECHA</div>
            <div className="allBorder">HORA INCIAL</div>
            <div className="allBorder">HORA FINAL</div>

            <div className="col_lg_sp_3 allBorder">CONSTRUCCIÓN EDIFICIO</div>
            <div className="col_lg_sp_2 allBorder">
              <div className="inputContainer">
                <input type="date" />
              </div>
            </div>
            <div className="allBorder">
              <div className="inputContainer">
                <input type="time" />
              </div>
            </div>
            <div className="allBorder">
              <div className="inputContainer">
                <input type="time" />
              </div>
            </div>

            <div className="col_lg_sp_3 allBorder">TRABAJO A REALIZAR</div>
            <div className="col_lg_sp_4 allBorder">Tarea / procedimiento</div>

            <div className="col_lg_sp_3 allBorder">
              <div className="inputContainer">
                <ActivitySelectBox handleSubtaskSelect={(evt)=>{handleCurrentActivity(evt)}} isEmpty={false} label="Seleciones" name="task" value="0123"/>
              </div>
            </div>
            <div className="col_lg_sp_4 allBorder">
              <div className="inputContainer">
                <SubActivitySelectBoxByParent  parentId={currentActivity} handleSubtaskSelect={()=>{}} isEmpty={false} setATS_INFO={setATS_INFO} atsControll={ATS_CONTROLL}/>
              </div>
            </div>

            <div className="atsTitle col_lg_sp_7 primary_theme allBorder">Autoevaluación para una ejecución segura (AES)</div>

            <div className="allBorder">EVALUAR EL RIESGO</div>
            <div className="col_lg_sp_6 allBorder">
              {" "}
              Qué puede salir mal? Cuál sería la PEOR cosa que pudiese ocurrir si algo sale mal? Materiales en el lugar? Riesgos Eléctricos? Riesgo de
              desplome? Herramientas/equipos en buenas condiciones? Ruido excesivo? Utilizando EPI adecuado? Equipo asegurado e identificado? Equipo
              crítico alterado?
            </div>
            <div className="allBorder">ANALIZAR/REDUCIR RIESGO</div>
            <div className="col_lg_sp_6 allBorder">Analizar los riesgos identificados arriba para determinar cómo reducir los mismos</div>
            <div className="allBorder">ACTUAR PARA ASEGURAR UNA OPERACION SEGURA</div>
            <div className="col_lg_sp_6 allBorder">
              Tomar las Acciones necesarias para asegurar que la tarea se haga en forma segura. Seguir los procedimientos. Acción apropiada puede ser
              asegurar con candado, instalar conos/avisos preventivos o mantenerse "fuera de la línea
            </div>

            <div className="atsTitle col_lg_sp_7 primary_theme allBorder">IDENTIFICACIÓN DE RIESGO</div>

            <div className="riskIdentificationContainer grid col_lg_sp_7 col_sm_3">
              <div className="allBorder">
                <div className="atsTitle  primary_theme">ALREDEDORES</div>
                <div className="optionContainer grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.surroundings.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive} onChange={() => {
                      handleInput("surroundings", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="allBorder">
                <div className="atsTitle  primary_theme">HERRAMIENTAS / EQUIPOS</div>

                <div className="optionContainer col_lg_sp_2 grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.equipmentAndTools.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive} onChange={() => {
                      handleInput("equipmentAndTools", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="allBorder">
                <div className="atsTitle  primary_theme">EPP REQUERIDO</div>
                <div className="optionContainer col_lg_sp_2 grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.requiredEpp.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive} onChange={() => {
                      handleInput("requiredEpp", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="riskIdentificationContainer grid col_lg_sp_7 col_sm_3">
              <div className="allBorder">
                <div className="atsTitle primary_theme">RIESGOS IDENTIFICADOS</div>

                <div className="optionContainer grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.identifiedRisks.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive} onChange={() => {
                      handleInput("identifiedRisks", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="allBorder">
                <div className="atsTitle  primary_theme">PRODUCTO / MATERIAL</div>

                <div className="optionContainer col_lg_sp_2 grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.productMaterial.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive}   onChange={() => {
                      handleInput("productMaterial", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="allBorder">
                <div className="atsTitle  primary_theme">OTROS</div>
                <div className="optionContainer col_lg_sp_2 grid col_sm_2">
                  {ATS_INFO.specificTask.riskIdentification.other.map((item, index) => {
                    return (
                      <div className="checkboxContainer" key={index}>
                        <input type="checkbox" id={item.option}  checked={item.isActive} onChange={() => {
                      handleInput("other", index, item.isActive);
                    }}/>
                        <label htmlFor={item.option}>{item.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col_lg_sp_2 primary_theme allBorder">PASOS DE LA TAREA</div>
            <div className="col_lg_sp_2 primary_theme allBorder"> RIESGOS POTENCIALES</div>
            <div className="col_lg_sp_2 primary_theme allBorder">CONSECUENCIAS</div>
            <div className="primary_theme allBorder">MEDIDAS DE CONTROL</div>
            <div className="col_lg_sp_2 allBorder">
              <ol>
                {ATS_INFO.specificTask.steps.length > 0 ? (
                  ATS_INFO.specificTask.steps.map((step) => {
                    return <li>{step}</li>;
                  })
                ) : (
                  <li>Ingresa una actividad</li>
                )}
              </ol>
            </div>
            <div className="col_lg_sp_2 allBorder">
              <ol>
                {ATS_INFO.specificTask.potentialRisks.length > 0 ? (
                  ATS_INFO.specificTask.potentialRisks.map((step) => {
                    return <li>{step}</li>;
                  })
                ) : (
                  <li>Ingresa una actividad</li>
                )}
              </ol>
            </div>
            <div className="col_lg_sp_2 allBorder">
              <ol>
                {ATS_INFO.specificTask.consequences.length > 0 ? (
                  ATS_INFO.specificTask.consequences.map((step) => {
                    return <li>{step}</li>;
                  })
                ) : (
                  <li>Ingresa una actividad</li>
                )}
              </ol>
            </div>
            <div className="allBorder">
              <ol>
                {ATS_INFO.specificTask.controlMeasures.length > 0 ? (
                  ATS_INFO.specificTask.controlMeasures.map((step) => {
                    return <li>{step}</li>;
                  })
                ) : (
                  <li>Ingresa una actividad</li>
                )}
              </ol>
            </div>
            <div className="col_lg_sp_7 allBorder">
              EJECUTORES QUE PARTICIPAN EN EL TRABAJO: Declaro haber leído y comprendido los peligros, los riesgos y especialmente las medidas de
              control que se implementarán antes y durante el trabajo que vamos a realizar, para garantizar un trabajo Seguro. Mi compromiso es: En
              todo momento comprobaré mi propia seguridad y la de mis compañeros de trabajo. Informaré oportunamente sobre cualquier situación de
              peligro y respetaré siempre, con disciplina los procedimientos y estándares establecidos.
            </div>

            <div className="col_lg_sp_2 primary_theme allBorder atsTitle">NOMBRES Y APELLIDOS</div>
            <div className="primary_theme allBorder"> CÉDULA</div>
            <div className="primary_theme allBorder">ARL</div>
            <div className="primary_theme allBorder">EPS</div>
            <div className="primary_theme col_lg_sp_2 allBorder">FIRMA</div>

            {ATS_INFO.workers.length > 0 ? (
              ATS_INFO.workers.map((worker) => {
                return (
                  <>
                    <div className="col_lg_sp_2 allBorder pointer" onClick={() => setSelectedWorker(worker)}>
                      {worker.name}
                    </div>
                    <div className="allBorder"> {worker.cc}</div>
                    <div className="allBorder">{worker.arl}</div>
                    <div className="allBorder">{worker.eps}</div>
                    <div className="col_lg_sp_2 allBorder">----</div>
                  </>
                );
              })
            ) : (
              <div className="col_lg_sp_7 allBorder">Añade los colaboradores que ejecutarán la actividad</div>
            )}
            <div className="col_lg_sp_6 allBorder">
              <div className="inputContainer">
                <Select options={workerOptions} styles={selectStyles} onChange={handleNewWorker} />
              </div>
            </div>
            <div className="allBorder">
              <button className="btnSmall btnFullWidth btnFullHeight btnSecondary" onClick={addNewWorker}>
                AÑADIR
              </button>
            </div>

            <div className="col_lg_sp_7 primary_theme allBorder">AUTORIZACIÓN DE APERTURA Y CIERRE DE PERMISO</div>
            <div className="allBorder">1</div>
            <div className="col_lg_sp_4 allBorder">¿Está seguro de que el plan de trabajo es apopiado para el riesgo?</div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id={"appropriate"} name="appropriate" />
                <label htmlFor="appropriate">SI</label>
              </div>
            </div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id="appropriate" name="appropriate" />
                <label htmlFor="appropriate">NO</label>
              </div>
            </div>

            <div className="allBorder">2</div>
            <div className="col_lg_sp_4 allBorder"> ¿Está seguro de que las personas tienen las competencias para realizar la tarea?</div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id={"competentPeople"} name="competentPeople" />
                <label htmlFor="competentPeople">SI</label>
              </div>
            </div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id="appropriate" name="appropriate" />
                <label htmlFor="appropriate">NO</label>
              </div>
            </div>

            <div className="allBorder">3</div>
            <div className="col_lg_sp_4 allBorder"> ¿Está seguro de que el equipo de trabajo tiene los permisos requeridos?</div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id={"competentPeople"} name="appropriate" />
                <label htmlFor="appropriate">SI</label>
              </div>
            </div>
            <div>
              <div className="checkboxContainer allBorder">
                <input type="checkbox" id="appropriate" name="appropriate" />
                <label htmlFor="appropriate">NO</label>
              </div>
            </div>

            <div className="col_lg_sp_3 primary_theme allBorder">RESPONSABLES</div>
            <div className="col_lg_sp_2 primary_theme allBorder">NOMBRES Y APELLIDOS</div>
            <div className=" primary_theme allBorder">APERTURA</div>
            <div className=" primary_theme allBorder">CIERRE</div>
            <div className="col_lg_sp_3 primary_theme allBorder">RESPONSABLE DE EJECUCIÓN DE LA ACTIVIDAD</div>
            <div className="col_lg_sp_2 allBorder"></div>
            <div className="allBorder"></div>
            <div className="allBorder"></div>
            <div className="col_lg_sp_3 primary_theme allBorder">RESIDENTE DEL PROYECTO</div>
            <div className="col_lg_sp_2 allBorder"></div>
            <div className="allBorder"></div>
            <div className="allBorder"></div>
            <div className="col_lg_sp_3 primary_theme allBorder">RESPONSABLE HSEQ / SST / VIGÍA</div>
            <div className="col_lg_sp_2 allBorder"></div>
            <div className="allBorder"></div>
            <div className="allBorder"></div>
          </div>
        </div>
        <div></div>
      </Grid>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_3 my_12">
        <div className="fixed mr_12">
          <SecondaryNavbar />
          <div className="atsConfiguration grid col_lg_sp_4">
            <div>
              <div className="workerImage">
                <img src={selectedWorker.img} alt="user" />
              </div>
            </div>
            <div className="col_lg_sp_2 flex flexColumn" style={{ gap: 8 }}>
              <InputBox
                inputName="name"
                isEmpty={false}
                labelTag="Nombre"
                onChange={handleChange}
                type="text"
                value={selectedWorker.name}
                className="col_lg_sp_2"
              />
              <InputBox
                inputName="cc"
                isEmpty={false}
                labelTag="Identificación"
                onChange={handleChange}
                type="number"
                value={`${selectedWorker.cc}`}
                className="col_lg_sp_2"
              />
              <div className="grid col_2 col_lg_sp_2" style={{ gap: 8 }}>
                <InputBox inputName="arl" isEmpty={false} labelTag="ARL" onChange={handleChange} type="text" value={selectedWorker.arl} />
                <InputBox inputName="eps" isEmpty={false} labelTag="EPS" onChange={handleChange} type="text" value={selectedWorker.eps} />
              </div>
            </div>

              
            <div className="col_lg_sp_3">
            {WORKER_INFO.items.map((item, index)=>{
                return(
                  //@ts-ignore
                  <WorkerInfoBox name={item.name} url={selectedWorker[item.propName]} key={Math.random()}/>
                )
              })}
            </div>
          </div>
        </div>
      </Grid>
    </CideinLayout>
  );
}

