import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Sidebar from "../components/layout/sidebar";
import { GET_PROJECTS_BY_USER_ID } from "../assets/apus_queries/materialsQueries";
import Loading from "../components/loading";

export default function ListPresupuestos() {
  const MIGUEL_MUTATION = gql`
    mutation __TEMP__ {
      __typename
    }
  `;

  const { userId } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECTS_BY_USER_ID, {
    variables: { userId },
    skip: !userId,
  });

  const [saveBudget, { loading: saving }] = useMutation(MIGUEL_MUTATION, {
    refetchQueries: [{ query: GET_PROJECTS_BY_USER_ID, variables: { userId } }],
    awaitRefetchQueries: true,
  });

  const presupuestoActual = {
    name: "Nombre del proyecto",
    description: "Descripción del proyecto",
    totalCost: 0,
  };

  const handleGuardarActual = async () => {
    await saveBudget({
      variables: {
        userId,
        name: presupuestoActual.name,
        description: presupuestoActual.description,
        totalCost: Number(presupuestoActual.totalCost),
      },
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <Loading />
      </div>
    );
  }

  const rows = (data?.getProjectByUserId ?? []).map((p: any) => ({
    _id: p._id,
    name: p.project_general_info?.name,
    description: p.project_general_info?.description,
    totalCost: p.project_general_info?.totalCost,
    fecha: format(new Date(), "yyyy-MM-dd"),
  }));

  return (
    <div className="container">
      <Sidebar />
      <div className="row">
        <div className="col-12">
          <h1>PRESUPUESTOS</h1>

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

          <p>
            Aquí podrás ver y gestionar tus presupuestos guardados. Si aún no
            tienes ninguno, crea uno con{" "}
            <strong>"Guardar presupuesto actual"</strong>.
          </p>

          <div className="input-group" style={{ marginBottom: "2rem" }}>
            <div className="busqueda_presupuestos">
              <input
                type="text"
                placeholder="Buscar tu presupuesto por su nombre..."
              />
              <button
                disabled={
                  saving ||
                  MIGUEL_MUTATION.definitions[0]?.name?.value === "__TEMP__"
                }
                onClick={handleGuardarActual}
                className="btn_buscar_presupuestos"
                style={{ marginLeft: 8 }}
                title={
                  MIGUEL_MUTATION.definitions[0]?.name?.value === "__TEMP__"
                    ? "Esperando la mutación real del backend"
                    : "Guardar presupuesto actual"
                }
              >
                {saving ? "Guardando..." : "Guardar "}
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN ACTIVIDAD</th>
                  <th>PRECIO TOTAL</th>
                  <th>FECHA</th>
                </tr>
              </thead>
              <tbody>
                {rows.length ? (
                  rows.map((r: any) => (
                    <tr>
                      <td data-label="ID">{r._id}</td>
                      <td data-label="Nombre">{r.name}</td>
                      <td data-label="Descripción actividad">
                        {r.description}
                      </td>
                      <td data-label="Precio total">{r.totalCost}</td>
                      <td data-label="Fecha">
                        <span className="badge-date">{r.fecha}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
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
                          No hay presupuestos guardados todavía
                        </h4>
                        <p className="presupuestos_no_hay">
                          Usa el botón de arriba para crear tu primer
                          presupuesto.
                        </p>
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
  );
}
