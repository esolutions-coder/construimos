import { useParams } from "react-router-dom";
import "../assets/styles/_constructord.scss";
import { CONSTRUCTORES } from "../utils/constructoresInfo";

const ConstructorDetalle = () => {
  const { nombre } = useParams();
  const constructor = CONSTRUCTORES.find(
    (c) => c.nombre === decodeURIComponent(nombre || "")
  );

  if (!constructor) {
    return <p>No se encontró el constructor.</p>;
  }

  return (
    <div>
      <div className="title-section">
        <h1> Conoce un poco más sobre {constructor.nombre}</h1>
        <p>
          {" "}
          Da el primer paso hacia tu proyecto soñado! Conecta con nosotros para
          construir tu visión.
        </p>
      </div>

      <div className="detalle-constructor-horizontal">
        <div className="imagen-nombre-container">
          <img
            src={constructor.imagen}
            alt={constructor.nombre}
            className="imagen-constructor-horizontal"
          />
          <h2 className="nombre-constructor-detalle">{constructor.nombre}</h2>
        </div>

        <div className="info-constructor">
          <div className="info-textos">
            <ul className="lista-detalles">
              <li>
                <strong>- Especialidad:</strong> {constructor.especialidad}
              </li>
              <li>
                <strong>- Ubicación:</strong> {constructor.ubicacion}
              </li>
              <li>
                <strong>- Experiencia:</strong> {constructor.experiencia}
              </li>
              <li>
                <strong>- Contacto:</strong> {constructor.contacto}
              </li>
            </ul>
          </div>
          <div className="contenedor-boton">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorDetalle;
