import { useParams } from "react-router-dom";
import { CONSTRUCTORES } from "../utils/constructoresInfo";
import { useNavigate } from "react-router-dom";
import construimosLogo from "../assets/img/cidein_logo_yellow.png";

const ConstructorDetalle = () => {
  const { nombre } = useParams();
  const constructor = CONSTRUCTORES.find(
    (c) => c.nombre === decodeURIComponent(nombre || "")
  );

  if (!constructor) {
    return <p>No se encontró el constructor.</p>;
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="barraazul">
        <header className="section-headerp align-header">
          <img className="logoknowmore" src={construimosLogo} alt="" />
          <p className="textknowmore">CONSTRUÍMOS</p>
        </header>
      </div>
      <span
        style={{ cursor: "pointer", marginLeft: "1rem", marginTop: "1rem" }}
        className="material-symbols-outlined"
        onClick={() => navigate(`/showroom`)}
      >
        {" "}
        arrow_back{" "}
      </span>
      <section className="profileWrapper">
        <div className="profileCard">
          {/* Header */}
          <div className="profileHeader">
            <img
              src={constructor.imagen}
              alt={constructor.nombre}
              className="profileImage"
            />

            <div className="profileInfo">
              <h1>
                {constructor.nombre}
                <button className="btnContact">Contacto</button>
              </h1>
              <p>{constructor.descripcion}</p>{" "}
              <p className="ubicacion">
                {constructor.ubicacion}{" "}
                <span className="material-symbols-outlined">location_on</span>
              </p>{" "}
            </div>
          </div>

          <hr className="divider" />

          {/* Content */}
          <div className="profileContent">
            <div className="column">
              <h3>Experiencia en</h3>
              <ul>
                <li>{constructor.experiencia[0]}</li>
                <li>{constructor.experiencia[1]}</li>
                <li>{constructor.experiencia[2]}</li>
                <li>{constructor.experiencia[3]}</li>
              </ul>
            </div>

            <div className="column">
              <h3>Obras</h3>
              <ul>
                <li>{constructor.obras[0]}</li>
                <li>{constructor.obras[1]}</li>
                <li>{constructor.obras[2]}</li>
                <li>{constructor.obras[3]}</li>
              </ul>
            </div>
          </div>

          <div className="profileAction"></div>
        </div>
      </section>
    </>
  );
};

export default ConstructorDetalle;

/*<div className="title-section">
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
            <button className="boton-contactar">
              Contactar con {constructor.nombre}
            </button>
          </div>
        </div>
      </div> */
