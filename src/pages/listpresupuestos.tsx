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

export default function ListPresupuestos() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filtro, setFiltro] = useState("");
  const [startDateStr, setStartDateStr] = useState(""); // "YYYY-MM-DD"
  const [endDateStr, setEndDateStr] = useState(""); // "YYYY-MM-DD"

  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_PROJECTS_BY_USER_ID, {
    variables: { userId: user?.id },
  });

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const navigate = useNavigate();

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
    // Fecha a las 00:00 (inicio del día)
    const d = new Date(startDateStr + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }, [startDateStr]);

  const endDateExclusive = useMemo(() => {
    if (!endDateStr) return null;
    // Para incluir completamente el día "Hasta", sumamos 1 día y usamos < endExclusive
    const d = new Date(endDateStr + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + 1);
    return d;
  }, [endDateStr]);

  const filteredRows = useMemo(() => {
    const q = submittedQuery.trim().toLowerCase();

    return rows.filter((r) => {
      // 1) Texto (opcional)
      const passText =
        !q ||
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q);

      // 2) Rango de fechas (opcional)
      let passDate = true;
      if (startDate || endDateExclusive) {
        if (!r.fecha) {
          passDate = false; // si piden rango y no hay fecha, se excluye
        } else {
          const t = r.fecha.getTime();
          if (startDate && t < startDate.getTime()) passDate = false;
          if (endDateExclusive && t >= endDateExclusive.getTime())
            passDate = false; // rango inclusivo
        }
      }

      return passText && passDate;
    });
  }, [rows, submittedQuery, startDate, endDateExclusive]);

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

            {/* ✅ FORM: el submit dispara el filtrado */}
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
                        <td data-label="options"></td>
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
