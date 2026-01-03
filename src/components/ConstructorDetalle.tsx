import { Link, useParams } from "react-router-dom";
import { CONSTRUCTORES } from "../utils/constructoresInfo";
import construimosLogo from "../assets/img/cidein_logo_yellow.png";
import { GET_USER_BY_ROLE } from "../assets/apus_queries/userQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CONSTRUCTOR from "../utils/materials/mocks/constructor.json";
import Constructors from "../utils/materials/controllers/constructors.controller";
import Loading from "./loading";
import { RoutesConstruimos } from "../utils/routes";

let ConstructorController = new Constructors([CONSTRUCTOR]); // esta clase es de Rafael

const ConstructorDetalle = () => {
  const [constructorss, setConstructors] = useState(
    ConstructorController.getState()
  );

  const { nombre } = useParams();
  const constructor = CONSTRUCTORES.find(
    (c) => c.nombre === decodeURIComponent(nombre || "")
  );

  if (!constructor) {
    return <p>No se encontró el constructor.</p>;
  }
  // Llamamos a GET_USER_BY_ROLE query de GRAPHQL
  const { data, loading, error } = useQuery(GET_USER_BY_ROLE, {
    variables: {
      role: "admin",
    },
  });

  // Cuando se cargue la página, se ejecuta esta función
  useEffect(() => {
    if (data) {
      ConstructorController.constructorss = JSON.parse(
        JSON.stringify(data.constructors)
      );
      setConstructors(ConstructorController.getState());
    }
    if (loading) {
      <Loading />;
    }
    if (error) {
      <div>Hubo un error</div>;
    }
  }, [data, loading, error]);

  console.log(constructorss);

  return (
    <>
      <div className="barraazul">
        <header className="section-headerp align-header">
          <img className="logoknowmore" src={construimosLogo} alt="" />
          <p className="textknowmore">CONSTRUÍMOS</p>
        </header>
      </div>
      <Link to={RoutesConstruimos.SHOWROOM}>
        <span
          style={{ cursor: "pointer", marginLeft: "1rem", marginTop: "1rem" }}
          className="material-symbols-outlined"
        >
          {" "}
          arrow_back{" "}
        </span>
      </Link>

      <section className="profileWrapper">
        <div className="profileCard">
          <div className="profileHeader">
            <img
              src={constructorss.image ?? "no hay imagen"}
              alt={constructorss.username ?? "Nombre desconocido"}
              className="profileImage"
            />

            <div className="profileInfo">
              <h1>
                {constructorss.username ?? "Nombre desconocido"}
                <button className="btnContact">Contacto</button>
              </h1>
              <p>{constructor.descripcion}</p>{" "}
              <p>{constructorss.email ?? "Email desconocido"}</p>
              <p className="ubicacion">
                {constructorss.location ?? "Ubicación desconocida"}{" "}
                <span className="material-symbols-outlined">location_on</span>
              </p>
            </div>
          </div>

          <hr className="divider" />

          {/* Content */}
          <div className="profileContent">
            <div className="column">
              <h3>Experiencia en</h3>
              {constructor.experiencia.map((experience, index) => (
                <ul key={index}>
                  <li>{experience}</li>
                </ul>
              ))}
            </div>

            <div className="column">
              <h3>Obras</h3>
              {constructor.obras.map((obra, index) => (
                <ul key={index}>
                  <li>{obra}</li>
                </ul>
              ))}
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
