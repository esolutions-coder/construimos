import CideinLayout from "../components/cidein_layout";
import ShowRoomItem from "../components/ShowRoomItem";
import ShowRoomItems from "../assets/info_json/showroom_item.json";
import ShowRoomStars from "../components/showroom_stars";
import constructor from "../assets/img/constructor.png";
import "../assets/styles/_containers.scss";
import { useState } from "react";
import ConstructorCard from "../components/ConstructorCard";
import camila from "../assets/img/camila.png";
import miguel from "../assets/img/miguel.png";
import carlos from "../assets/img/carlos.png";
import rafael from "../assets/img/rafael.png";
import angelyn from "../assets/img/angelyn.png";

function ShowRoom() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<string[]>([]);

  const constructores = [
    "Miguel Tapia",
    "Camila Lopez",
    "Rafael Zambrano",
    "Juan Carlos",
    "Angelyn Alameda",
  ];

  const obtenerImagen = (nombre: string) => {
    if (nombre === "Camila Lopez") return camila;
    if (nombre === "Miguel Tapia") return miguel;
    if (nombre === "Rafael Zambrano") return rafael;
    if (nombre === "Juan Carlos") return carlos;
    if (nombre === "Angelyn Alameda") return angelyn;
    return constructor;
  };

  const handleBuscar = () => {
    const filtrados = constructores.filter((nombre) =>
      nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(filtrados);
  };

  return (
    <CideinLayout>
      <div className="title-section">
        <h1> Encuentra al Constructor Ideal para tu Proyecto</h1>
        <p>Conecta con expertos confiables según tu ubicación y necesidades.</p>
      </div>

      <div className="contenedor-principal">
        <div className="areabusqueda">
          <input
            type="text"
            placeholder="Buscar constructores por su nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn_primary_theme" onClick={handleBuscar}>
            Buscar
          </button>
        </div>
      </div>

      <div className="contenedor-imagenes">
        {(resultados.length > 0 ? resultados : constructores).map(
          (nombre, index) => (
            <ConstructorCard
              key={index}
              nombre={nombre}
              imagen={obtenerImagen(nombre)}
            />
          )
        )}
      </div>
    </CideinLayout>
  );
}

export default ShowRoom;
