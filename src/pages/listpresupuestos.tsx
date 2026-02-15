import { useQuery, useMutation } from "@apollo/client";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/auth/useAuth";
import { GET_PROJECTS_BY_USER_ID } from "../assets/apus_queries/materialsQueries";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import { usePages } from "../customHooks/auth/usePages";
import { Presupuesto } from "../utils/list_types";
import { useDateFilter } from "../customHooks/auth/useDateFilter";
import CideinLayout from "../components/cidein_layout";
import Formatter from "../utils/formatter";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";
import Loading from "../components/loading";

export default function ListPresupuestos() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filtro, setFiltro] = useState("");
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");
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

  const { loading, error, data } = useQuery(GET_PROJECTS_BY_USER_ID, {
    variables: { userId: user?._id },
  });

  // MUTACION PARA ELIMINAR EL PRESUPUESTO DE LA LISTA

  const [deleteProject, { loading: deletingProject }] = useMutation(
    DELETE_PROJECT_BUDGET,
  );

  // PLASMAMOS LA QUERY

  const rows = useMemo(() => {
    const list = (data?.getProjectByUserId ?? []).map((p: any) => ({
      _id: p._id,
      name: p.project_general_info?.name ?? "",
      description: p.project_general_info?.description ?? "",
      total_cost: p.project_general_info?.total_cost ?? 0,
      location: p.project_general_info?.location ?? "",
      postal_code: p.project_general_info?.postal_code ?? 0,
      fecha: p.project_general_info?.date
        ? new Date(p.project_general_info.date)
        : null,
    }));
    return list;
  }, [data]);

  // FILTRAR POR FECHA
  const { filteredByDate } = useDateFilter<Presupuesto>({
    rows,
    startDateStr,
    endDateStr,
    getDate: (row) => row.fecha,
  });

  const {
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    paginatedRows,
  } = usePages<Presupuesto>({
    rows: filteredByDate,
    searchQuery: submittedQuery,
    itemsPerPage: 20,
    searchFn: (row, query) => row.name.toLowerCase().includes(query),
  });

  // FUNCION PARA RESTABLECER EL FILTRO POR FECHA

  const restablecerFiltros = () => {
    setStartDateStr("");
    setEndDateStr("");
    setSubmittedQuery("");
  };

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };
  // FUNCION PARA FORMATEAR LA FECHA

  const formatFechaHora = (d: Date | null) =>
    d
      ? new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Europe/Madrid",
        }).format(d)
      : "—";

  // FILTRAR POR TEXTO

  const onRowAction = async (action: string, id: string) => {
    if (!action) return;

    if (action === "edit") {
      navigate(`/presupuestos/pill/:slug/id/${id}`);
      return;
    }

    if (action === "delete") {
      try {
        await deleteProject({
          variables: { projectId: id },
          update(cache) {
            const existing: any = cache.readQuery({
              query: GET_PROJECTS_BY_USER_ID,
              variables: { userId: user?._id },
            });

            if (!existing?.getProjectByUserId) return;

            cache.writeQuery({
              query: GET_PROJECTS_BY_USER_ID,
              variables: { userId: user?._id },
              data: {
                getProjectByUserId: existing.getProjectByUserId.filter(
                  (p: any) => p._id !== id,
                ),
              },
            });
          },
        });
      } catch (e) {
        alert("No se pudo eliminar. Intenta de nuevo.");
      }
    }
  };

  return (
    <CideinLayout>
      <div className="containersss">
        <div className="row">
          <div className="col-12">
            <h1>
              PRESUPUESTOS: PANEL PRINCIPAL
              <span
                className="material-symbols-outlined helpp"
                title="Busca tus presupuestos guardados, por nombre, o por fecha."
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
                No se pudieron cargar algunos datos. Intentaremos de nuevo al
                guardar o recargar. Puedes seguir usando la tabla.
              </div>
            )}

            <div className="input-group">
              <select
                id="servicio"
                className="filltroo"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="" disabled>
                  FILTROS: NOMBRE
                </option>
                <option value="localizacion">LOCALIZACIÓN</option>
                <option value="nombre">NOMBRE</option>
              </select>
              <div className="busquedafechass">
                <span>FECHA: DESDE</span>
                <input
                  type="date"
                  onChange={(e) => setStartDateStr(e.target.value)}
                  value={startDateStr}
                />
                <span>A</span>
                <input
                  type="date"
                  onChange={(e) => setEndDateStr(e.target.value)}
                  value={endDateStr}
                />
                <span
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    marginTop: "12px",
                  }}
                  className="material-symbols-outlined"
                  onClick={restablecerFiltros}
                >
                  refresh
                </span>
              </div>
            </div>

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
                    <th>ITEM</th>
                    <th>NOMBRE PRESUPUESTO</th>
                    <th>PRECIO TOTAL</th>
                    <th>LOCALIZACIÓN</th>
                    <th>CÓDIGO POSTAL</th>
                    <th>FECHA</th>
                    <th>OPCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6}>
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
                    paginatedRows.map((item: Presupuesto, index: number) => (
                      <tr key={item._id}>
                        <td>{currentPage * itemsPerPage + index + 1}</td>
                        <td
                          style={{ cursor: "pointer", color: "#243c90" }}
                          className="presupuestos-name"
                          onClick={() =>
                            navigate(`/presupuestos/pill/:slug/id/${item._id}`)
                          }
                        >
                          {item.name}
                        </td>
                        <td>{Formatter(item.total_cost)}</td>
                        <td>{item.location}</td>
                        <td>{item.postal_code}</td>
                        <td>
                          <span className="badge-date">
                            {formatFechaHora(item.fecha)}
                          </span>
                        </td>
                        <td>
                          <ActionsMenu
                            itemId={item._id}
                            deletingProject={deletingProject}
                            onRowAction={onRowAction}
                            helpfulAlert={helpfulAlert}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        style={{ textAlign: "center", padding: "2rem" }}
                      >
                        {submittedQuery
                          ? "No hay resultados para esta búsqueda"
                          : "No hay presupuestos guardados todavía"}
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
                  {Array.from({ length: totalPages }, (_, index) => (
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
      </div>
    </CideinLayout>
  );
}
