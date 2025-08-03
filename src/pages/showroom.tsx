import CideinLayout from "../components/cidein_layout";
import ShowRoomItem from "../components/ShowRoomItem";
import ShowRoomItems from "../assets/info_json/showroom_item.json";
import ShowRoomStars from "../components/showroom_stars";
import constructor from "../assets/img/constructor.png";
import "../assets/styles/_containers.scss";
import { useState } from "react";
import ConstructorCard from "../components/ConstructorCard";
import luis from "../assets/img/luis.png";
import alberto from "../assets/img/alberto.png";
import carlos from "../assets/img/carlos.png";
import gareth from "../assets/img/gareth.png";
import davies from "../assets/img/davies.png";

function ShowRoom() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<string[]>([]);

  const constructores = [
    "Alberto Jimenez",
    "Luis Diaz",
    "Gareth Bale",
    "Juan Carlos",
    "Davies Fernandez",
  ];

  const obtenerImagen = (nombre: string) => {
    if (nombre === "Luis Diaz") return luis;
    if (nombre === "Alberto Jimenez") return alberto;
    if (nombre === "Gareth Bale") return gareth;
    if (nombre === "Juan Carlos") return carlos;
    if (nombre === "Davies Fernandez") return davies;
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
        <h1>🔨 Encuentra al Constructor Ideal para tu Proyecto</h1>
        <p>Conecta con expertos confiables según tu ubicación y necesidades.</p>
      </div>

      <div className="contenedor-principal">
        <div className="areabusqueda">
          <input
            type="text"
            placeholder="🔎 Buscar constructores por su nombre..."
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
