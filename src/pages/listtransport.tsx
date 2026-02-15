import { useQuery } from "@apollo/client";
import Loading from "../components/loading";
import { useState, useMemo } from "react";
import Pagination from "../components/pagination";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";
import { GET_TRANSPORTATION_BY_PROVIDER_ID } from "../api/materials/materials.query";
import Formatter from "../utils/formatter";
import CideinLayoutProvedor from "../components/cidein_layout_provedor";
import { TransportationByProviderId } from "../utils/list_types";
import { usePages } from "../customHooks/auth/usePages";

export default function ListTransportation() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "La APU se ha creado correctamente",
    color: "primary_theme",
    icon: "info",
  });

  const helpfulAlert = (
    message: string,
    color: string,
    time: number,
    icon: string,
  ) => {
    setWarningProps({
      message: message,
      warningState: true,
      icon: icon,
      color: color,
    });

    setTimeout(() => {
      setWarningProps({
        message: "Aquí aparecerán tus mensajes",
        warningState: false,
        icon: "info",
        color: "primary_theme",
      });
    }, time * 1000);
  };

  // LLAMADA A LA QUERY

  const { loading, error, data } = useQuery(GET_TRANSPORTATION_BY_PROVIDER_ID, {
    variables: { providerId: user?._id },
    fetchPolicy: "no-cache",
  });

  console.log("data", data);

  const [deleteProject, { loading: deletingProject }] = useMutation(
    DELETE_PROJECT_BUDGET,
  );

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const rows = useMemo(() => {
    return (data?.transportationByProviderId ?? []).map(
      (p: TransportationByProviderId) => ({
        _id: p._id,
        stock: p.stock,
        transportation_category: p.transportation_category,
        transportation_code: p.transportation_code,
        transportation_name: p.transportation_name,
        transportation_provider: p.transportation_provider,
        transportation_rud: p.transportation_provider,
        transportation_unit: p.transportation_unit,
        transportation_unitary_price: p.transportation_unitary_price,
      }),
    );
  }, [data]);

  const {
    paginatedRows,
    totalPages,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    submittedQuery,
    setSubmittedQuery,
  } = usePages<TransportationByProviderId>({
    rows,
    itemsPerPage: 20,
    searchFn: (row, query) =>
      row.transportation_name.toLowerCase().includes(query),
  });

  const onRowAction = async (action: string, id: string) => {
    if (!action) return;

    if (action === "edit") {
      navigate(`/provider/materials`);
      return;
    }
  };

  return (
    <CideinLayoutProvedor>
      <div className="containersss">
        <div className="row">
          <div className="col-12">
            <h1>
              TRANSPORTE
              <span
                className="material-symbols-outlined helpp"
                title="Busca tus transportes guardados, por nombre."
              >
                help
              </span>{" "}
            </h1>

            {error && (
              <div
                style={{
                  margin: "8px 0 16px",
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: "#fff3cd",
                  color: "#664d03",
                  border: "1px solid #ffecb5",
                }}
              >
                No se pudo cargar los transportes.
              </div>
            )}
          </div>
          <p
            style={{
              display: "flex",
              justifyContent: "left",
              fontSize: "1.3rem",
              marginBottom: "1rem",
              marginTop: "-1rem",
            }}
          >
            Busca tus transportes guardados, por nombre
          </p>
          <form
            className="input-groups"
            style={{ marginBottom: "2rem" }}
            onSubmit={onSubmitBuscar}
          >
            <div className="busqueda_presupuestos">
              <input
                value={query}
                type="text"
                placeholder="BUSCAR PRESUPUESTOS"
                onChange={(e) => setQuery(e.target.value)}
                className="input-gr"
              />
            </div>
            <button className="btn_buscar_presupuestoss" type="submit">
              BUSCAR
            </button>
          </form>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NOMBRE TRANSPORTE</th>
                  <th>CÓDIGO</th>
                  <th>PROVEEDOR</th>
                  <th>CATEGORIA</th>
                  <th>UNIDAD</th>
                  <th>STOCK</th>
                  <th>PRECIO UNITARIO</th>
                  <th>RUD</th>
                  <th>OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10}>
                      <Loading />
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                <CideinWarning
                  state={warningProps.warningState}
                  message={warningProps.message}
                  color={warningProps.color}
                  icon={warningProps.icon}
                  setWarningProps={setWarningProps}
                />
                {paginatedRows.length ? (
                  paginatedRows.map(
                    (item: TransportationByProviderId, index: number) => (
                      <tr key={item._id}>
                        <td>{currentPage * itemsPerPage + index + 1}</td>
                        <td
                          onClick={() => navigate(`/provider/materials`)}
                          style={{ cursor: "pointer" }}
                        >
                          {item.transportation_name}
                        </td>
                        <td>{item.transportation_code}</td>
                        <td>{item.transportation_provider}</td>
                        <td>{item.transportation_category ?? "0"}</td>
                        <td> {item.transportation_unit}</td>
                        <td>{item.stock ?? "No hay stock"}</td>
                        <td>{Formatter(item.transportation_unitary_price)}</td>
                        <td>{item.transportation_rud}</td>
                        <td>
                          <ActionsMenu
                            itemId={item._id}
                            deletingProject={deletingProject}
                            onRowAction={onRowAction}
                            helpfulAlert={helpfulAlert}
                          />
                        </td>
                      </tr>
                    ),
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      {submittedQuery
                        ? "No hay resultados para esta búsqueda"
                        : "No hay transportes guardados todavía"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={{ marginTop: 20 }}>
              <ul
                style={{
                  display: "flex",
                  gap: 10,
                  listStyle: "none",
                  justifyContent: "center",
                }}
              >
                {Array.from({ length: 20 }, (_, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    style={{
                      cursor: "pointer",
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: currentPage === index ? "#fdbe33" : "#eee",
                      color: currentPage === index ? "#fff" : "#000",
                    }}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </CideinLayoutProvedor>
  );
}
