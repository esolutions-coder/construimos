import { Link, useParams } from "react-router-dom";
import construimosLogo from "../assets/img/cidein_logo_yellow.png";
import { GET_USER_BY_ROLE } from "../assets/apus_queries/userQueries";
import { useQuery } from "@apollo/client";
import Loading from "./loading";
import { RoutesConstruimos } from "../utils/routes";
import { useEffect, useState } from "react";

type InfoConstructor = {
  username: string;
  _id: string;
  email: string;
  location: string;
  xp: Array<any>;
  nit: string;
  role: string;
  postalCode: string;
  image: string;
  description: string;
};

const ConstructorDetalle = () => {
  const { id } = useParams<{ id: string }>();

  const [constructor, setConstructor] = useState<InfoConstructor | null>(null);

  const { data, loading, error } = useQuery(GET_USER_BY_ROLE, {
    variables: { role: "admin" },
  });

  useEffect(() => {
    if (data?.getUsersByRole && id) {
      const found = data.getUsersByRole.find(
        (item: InfoConstructor) => item._id === id
      );
      setConstructor(found ?? null);
    }
  }, [data, id]);

  if (loading) return <Loading />;
  if (error) return <div>Hubo un error</div>;
  if (!constructor) return <Loading />;

  return (
    <>
      <div className="barraazul">
        <header className="section-headerp align-header">
          <img className="logoknowmore" src={construimosLogo} alt="" />
          <p className="textknowmore">CONSTRUIMOS</p>
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
              src={constructor.image ?? "no hay imagen"}
              alt={constructor.username}
              className="profileImage"
            />

            <div className="profileInfo">
              <h1>
                {constructor.username ?? "Nombre desconocido"}
                <button className="btnContact">Contacto</button>
              </h1>
              <p>{constructor.description ?? "Descripción desconocida"}</p>
              <p>{constructor.email ?? "Email desconocido"}</p>

              <p className="ubicacion">
                {constructor.location ?? "Ubicación desconocida"}
                <span className="material-symbols-outlined">location_on</span>
              </p>
              <hr className="divider" />

              <div className="profileContent">
                <div className="column">
                  <h3>XP</h3>
                  {constructor.xp?.map((xp: any, index: number) => (
                    <ul key={index}>
                      <li>{xp.title ?? "Titulo desconocido"}</li>
                      <li>{xp.duration ?? "Duración desconocida"}</li>
                      <li>{xp.description ?? "Descripción desconocida"}</li>
                    </ul>
                  ))}
                </div>
                <div className="column">
                  <h3>Información</h3>
                  <p>{constructor.nit ?? "NIT desconocido"}</p>
                  <p>{constructor.role ?? "Rol desconocido"}</p>
                  <p>{constructor.postalCode ?? "Código postal desconocido"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConstructorDetalle;
