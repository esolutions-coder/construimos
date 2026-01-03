import CideinLayout from "../components/cidein_layout";
import "../assets/styles/_containers.scss";
import { useEffect, useState } from "react";
import ConstructorCard from "../components/ConstructorCard";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ROLE } from "../assets/apus_queries/userQueries";
import Loading from "../components/loading";

type ConstructorFromQuery = {
  _id: string;
  username: string;
  image: string;
};

function ShowRoom() {
  const [busqueda, setBusqueda] = useState("");
  const [filtrar, setFiltrar] = useState<ConstructorFromQuery[]>([]);
  const [resultados, setResultados] = useState<ConstructorFromQuery[]>([]);

  const { data, loading, error } = useQuery(GET_USER_BY_ROLE, {
    variables: { role: "admin" },
  });

  useEffect(() => {
    if (data?.getUsersByRole) {
      setFiltrar(data.getUsersByRole);
      setResultados(data.getUsersByRole);
    }
  }, [data]);

  // 🔍 buscador correcto
  const handleBuscar = () => {
    if (!busqueda.trim()) {
      setResultados(filtrar);
      return;
    }

    const filtrados = filtrar.filter((item) =>
      item.username.toLowerCase().includes(busqueda.toLowerCase())
    );

    setResultados(filtrados);
  };

  if (loading) return <Loading />;
  if (error) return <div>Hubo un error</div>;

  return (
    <CideinLayout>
      <div className="title-section">
        <h1>Encuentra al Constructor Ideal para tu Proyecto</h1>
        <p>
          Conecta con expertos confiables según tu ubicación y necesidades.{" "}
          <strong style={{ color: "#b98b27ff" }}>
            Para ver la información del constructor, haz click en la imagen.
          </strong>
        </p>
      </div>

      <div className="input-groups" style={{ marginBottom: "2rem" }}>
        <div className="busqueda_constructores">
          <input
            type="text"
            placeholder="Buscar constructores por su nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-gr"
          />
          <button
            type="button"
            className="btn_buscar_presupuestoss"
            onClick={handleBuscar}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="contenedor-imagenes">
        {resultados.map((item) => (
          <ConstructorCard
            key={item._id}
            id={item._id}
            nombre={item.username}
            imagen={item.image}
          />
        ))}
      </div>
    </CideinLayout>
  );
}

export default ShowRoom;
