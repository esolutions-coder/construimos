import { useQuery } from "@apollo/client";
import { GET_PROJECTS_BY_USER_ID } from "../assets/apus_queries/materialsQueries";
//import Loading from "../components/loading";
import { useState, useMemo, useEffect } from "react";
import CideinLayout from "../components/cidein_layout";
import Pagination from "../components/pagination";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";
import {
  GET_EQUIPMENT_BY_PROVIDER_ID,
  GET_MATERIALS_BY_PROVIDER_ID,
  GET_TRANSPORTATION_BY_PROVIDER_ID,
  WORKHAND_BY_PROVIDER_ID,
} from "../api/materials/materials.query";
import Formatter from "../utils/formatter";
import CideinLayoutProvedor from "../components/cidein_layout_provedor";

type EquipmentByProviderId = {
  _id: string;
  stock: number;
  equipment_code: string;
  equipment_name: string;
  equipment_provider: string;
  equipment_rud: number;
  equipment_unit: string;
  equipment_unitary_price: number;
};

export default function ListadeEquipo() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filtro, setFiltro] = useState("");
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

  const { loading, error, data } = useQuery(GET_EQUIPMENT_BY_PROVIDER_ID, {
    variables: { providerId: user?._id },
    fetchPolicy: "no-cache",
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
    return (data?.equipmentByProviderId ?? []).map(
      (p: EquipmentByProviderId) => ({
        _id: p._id,
        stock: p.stock,
        equipment_code: p.equipment_code,
        equipment_name: p.equipment_name,
        equipment_provider: p.equipment_provider,
        equipment_rud: p.equipment_rud,
        equipment_unit: p.equipment_unit,
        equipment_unitary_price: p.equipment_unitary_price,
      })
    );
  }, [data]);

  const filteredRows = useMemo(() => {
    const q = submittedQuery.trim().toLowerCase();
    return rows.filter((r: any) => {
      const passText = (r.equipment_name ?? "").toLowerCase().includes(q);

      return passText;
    });
  }, [rows, submittedQuery]);

  const onRowAction = async (action: string, id: string) => {
    if (!action) return;

    if (action === "edit") {
      navigate(`/provider/materials`);
      return;
    }

    // if (action === "delete") {
    //   try {
    //     await deleteProject({
    //       variables: { projectId: id },
    //       update(cache) {
    //         const existing: any = cache.readQuery({
    //           query: GET_PROJECTS_BY_USER_ID,
    //           variables: { userId: user?._id },
    //         });

    //         if (!existing?.getProjectByUserId) return;

    //         cache.writeQuery({
    //           query: GET_PROJECTS_BY_USER_ID,
    //           variables: { userId: user?._id },
    //           data: {
    //             getProjectByUserId: existing.getProjectByUserId.filter(
    //               (p: any) => p._id !== id
    //             ),
    //           },
    //         });
    //       },
    //     });
    //   } catch (e) {
    //     alert("No se pudo eliminar. Intenta de nuevo.");
    //   }
    // }
  };

  return (
    <CideinLayoutProvedor>
      <div className="containersss">
        <div className="row">
          <div className="col-12">
            <h1>
              EQUIPO
              <span
                className="material-symbols-outlined helpp"
                title="Busca tus equipos guardados, por nombre."
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
            Busca tus equipos guardados, por nombre
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
                  <th>NOMBRE EQUIPO</th>
                  <th>CÓDIGO</th>
                  <th>PROVEEDOR</th>
                  <th>UNIDAD</th>
                  <th>STOCK</th>
                  <th>PRECIO UNITARIO</th>
                  <th>RUD</th>
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
                  filteredRows.map(
                    (item: EquipmentByProviderId, index: number) => (
                      <tr key={item._id}>
                        <td data-label="ID">{index + 1}</td>
                        <td
                          data-label="Nombre"
                          className="presupuestos-name"
                          onClick={() => navigate(`/provider/materials`)}
                        >
                          {item.equipment_name}
                        </td>
                        <td data-label="Precio total">{item.equipment_code}</td>
                        <td data-label="Código postal">
                          {item.equipment_provider}
                        </td>
                        <td data-label="Fecha">{item.equipment_unit}</td>
                        <td data-label="Fecha">{item.stock ?? "0"}</td>
                        <td data-label="Fecha">
                          {Formatter(item.equipment_unitary_price)}
                        </td>
                        <td data-label="Fecha">{item.equipment_rud}</td>
                        <td data-label="options">
                          <ActionsMenu
                            itemId={item._id}
                            deletingProject={deletingProject}
                            onRowAction={onRowAction}
                            helpfulAlert={helpfulAlert}
                          />
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={9}>
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
                            : "No hay  equipos para esta búsqueda"}
                        </h4>
                        <p className="presupuestos_no_hay">
                          {submittedQuery
                            ? "Ajusta el término y vuelve a buscar."
                            : "Usa el botón de arriba para crear tu primer equipo."}
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
    </CideinLayoutProvedor>
  );
}
