import { useQuery } from "@apollo/client";
import { GET_PROJECTS_BY_USER_ID } from "../assets/apus_queries/materialsQueries";
import Loading from "../components/loading";
import { useState, useMemo, useEffect } from "react";
import CideinLayout from "../components/cidein_layout";
import signointerrogacion from "../assets/img/signointerrogacion.png";
import Pagination from "../components/pagination";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import Formatter from "../utils/formatter";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import CideinWarning from "../components/warning";

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

  const { loading, error, data } = useQuery(GET_PROJECTS_BY_USER_ID, {
    variables: { userId: user?.id },
  });

  const [deleteProject, { loading: deletingProject }] = useMutation(
    DELETE_PROJECT_BUDGET
  );

  useEffect(() => {
    if (error) {
      <div>Hubo un error</div>;
    }
    if (loading) {
      <div>
        <Loading />
      </div>;
    }
  }, [data]);

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const rows = useMemo(() => {
    const list = (data?.getProjectByUserId ?? []).map((p: any) => ({
      _id: p._id,
      name: p.project_general_info?.name ?? "",
      description: p.project_general_info?.description ?? "",
      total_cost: p.project_general_info?.total_cost ?? 0,
      fecha: p.project_general_info?.date
        ? new Date(p.project_general_info.date)
        : null,
    }));
    return list;
  }, [data]);

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
      navigate(`/presupuestos/editor/${id}`);
      return;
    }

    if (action === "delete") {
      const ok = window.confirm(
        "¿Seguro que quieres eliminar este presupuesto?"
      );
      if (!ok) return;

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

  return (
    <CideinLayout>
      <div className="containersss">
        <div className="row">
          <div className="col-12">
            <h1>
              PRESUPUESTOS: PANEL PRINCIPAL{" "}
              <img
                src={signointerrogacion}
                alt=""
                title="Busca tus presupuestos guardados por NOMBRE O FECHA"
              />
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
                    <th>LOCALIZACIÓN</th>
                    <th>PRECIO TOTAL</th>
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
                        <td data-label="ID">{index}</td>
                        <td
                          data-label="Nombre"
                          className="presupuestos-name"
                          onClick={() =>
                            navigate(`/presupuestos/pill/:slug/id/${item._id}`)
                          }
                        >
                          {item.name}
                        </td>

                        <td data-label="Descripción actividad">
                          {item.description}
                        </td>
                        <td data-label="Precio total">
                          {Formatter(item.total_cost)}
                        </td>
                        <td data-label="Fecha">
                          <span className="badge-date">
                            {item.fecha
                              ? item.fecha.toLocaleDateString("es-ES")
                              : "—"}
                          </span>
                        </td>
                        <td data-label="options">
                          <select
                            defaultValue=""
                            disabled={deletingProject}
                            onChange={(e) => {
                              const value = e.target.value;
                              onRowAction(value, item._id);
                              // volver al placeholder
                              e.currentTarget.selectedIndex = 0;
                              helpfulAlert(
                                "Presupuesto eliminado correctamente",
                                "success_theme",
                                5,
                                "check_circle"
                              );
                            }}
                            style={{
                              padding: "6px 8px",
                              borderRadius: 8,
                              border: "1px solid #ddd",
                              background: "#fff",
                              cursor: "pointer",
                            }}
                            aria-label="Acciones del presupuesto"
                            title="Acciones"
                          >
                            <option value="" disabled>
                              ⚙️
                            </option>
                            <option value="edit">✏️ Editar</option>
                            <option value="delete">🗑️ Eliminar</option>
                          </select>
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
