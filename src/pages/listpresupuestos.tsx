import { useQuery } from "@apollo/client";
import { GET_PROJECTS_BY_USER_ID } from "../assets/apus_queries/materialsQueries";
//import Loading from "../components/loading";
import { useState, useMemo, useEffect } from "react";
import CideinLayout from "../components/cidein_layout";
import Pagination from "../components/pagination";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import Formatter from "../utils/formatter";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";

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
    icon: string
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
    DELETE_PROJECT_BUDGET
  );

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

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

  const startDate = useMemo(() => {
    if (!startDateStr) return null;
    const d = new Date(startDateStr + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }, [startDateStr]);

  const endDateExclusive = useMemo(() => {
    if (!endDateStr) return null;
    const d = new Date(endDateStr + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + 1);
    return d;
  }, [endDateStr]);

  // FUNCION PARA RESTABLECER EL FILTRO POR FECHA

  const restablecerFiltros = () => {
    setStartDateStr(null);
    setEndDateStr(null);
    setSubmittedQuery("");
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

  const filteredRows = useMemo(() => {
    const q = submittedQuery.trim().toLowerCase();

    return rows.filter((r) => {
      const passText =
        !q ||
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q);

      let passDate = true;
      if (startDate || endDateExclusive) {
        if (!r.fecha) {
          passDate = false;
        } else {
          const t = r.fecha.getTime();
          if (startDate && t < startDate.getTime()) passDate = false;
          if (endDateExclusive && t >= endDateExclusive.getTime())
            passDate = false;
        }
      }

      return passText && passDate;
    });
  }, [rows, submittedQuery, startDate, endDateExclusive]);

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
              variables: { userId: user?.id },
            });

            if (!existing?.getProjectByUserId) return;

            cache.writeQuery({
              query: GET_PROJECTS_BY_USER_ID,
              variables: { userId: user?.id },
              data: {
                getProjectByUserId: existing.getProjectByUserId.filter(
                  (p: any) => p._id !== id
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

  useEffect(()=>{
    if(data){
      console.log(user)
      console.log(data);
    }
  },[data])

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
                  <CideinWarning
                    state={warningProps.warningState}
                    message={warningProps.message}
                    color={warningProps.color}
                    icon={warningProps.icon}
                    setWarningProps={setWarningProps}
                  />
                  {filteredRows.length ? (
                    filteredRows.map((item, index) => (
                      <tr key={item._id}>
                        <td data-label="ID">{index + 1}</td>
                        <td
                          data-label="Nombre"
                          className="presupuestos-name"
                          onClick={() =>
                            navigate(`/presupuestos/pill/:slug/id/${item._id}`)
                          }
                        >
                          {item.name}
                        </td>
                        <td data-label="Precio total">
                          {Formatter(item.total_cost)}
                        </td>
                        <td data-label="Ubicación">{item.location}</td>
                        <td data-label="Código postal">{item.postal_code}</td>
                        <td data-label="Fecha">
                          <span className="badge-date">
                            {formatFechaHora(item.fecha)}
                          </span>
                        </td>
                        <td data-label="options">
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
                      <td colSpan={6}>
                        <div
                          style={{
                            textAlign: "center",
                            padding: "3rem 0",
                            color: "#666",
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 48, color: "#ccc" }}
                          >
                            content_paste_off
                          </span>
                          <h4 style={{ marginTop: 16 }}>
                            {submittedQuery
                              ? "No hay resultados para esta búsqueda"
                              : "No hay presupuestos guardados todavía"}
                          </h4>
                          <p className="presupuestos_no_hay">
                            {submittedQuery
                              ? "Ajusta el término y vuelve a buscar."
                              : "Usa el botón de arriba para crear tu primer presupuesto."}
                          </p>
                        </div>
                        <div className="container-pagination">
                          <Pagination />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CideinLayout>
  );
}
