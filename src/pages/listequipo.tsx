import { useQuery, useMutation } from "@apollo/client";
import { useState, useMemo } from "react";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import { GET_EQUIPMENT_BY_PROVIDER_ID } from "../api/materials/materials.query";
import { EquipmentByProviderId } from "../utils/list_types";
import { usePages } from "../customHooks/auth/usePages";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";
import Formatter from "../utils/formatter";
import CideinLayoutProvedor from "../components/cidein_layout_provedor";
import Loading from "../components/loading";

export default function ListadeEquipo() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "La APU se ha creado correctamente",
    color: "primary_theme",
    icon: "info",
  });

  const helpfulAlert = (message: string, color: string, time: number, icon: string) => {
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

  const [deleteProject, { loading: deletingProject }] = useMutation(DELETE_PROJECT_BUDGET);

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  // PLASMAMOS LA QUERY

  const rows = useMemo(() => {
    return (data?.equipmentByProviderId ?? []).map((p: EquipmentByProviderId) => ({
      _id: p._id,
      stock: p.stock,
      equipment_code: p.equipment_code,
      equipment_name: p.equipment_name,
      equipment_provider: p.equipment_provider,
      equipment_rud: p.equipment_rud,
      equipment_unit: p.equipment_unit,
      equipment_unitary_price: p.equipment_unitary_price,
    }));
  }, [data]);

  const { paginatedRows, totalPages, currentPage, itemsPerPage, setCurrentPage, submittedQuery, setSubmittedQuery } =
    usePages<EquipmentByProviderId>({
      rows,
      itemsPerPage: 20,
      searchFn: (row, query) => row.equipment_name.toLowerCase().includes(query),
    });

  const sortedRows = useMemo(() => {
    return [...paginatedRows].sort((a, b) => a.equipment_name.toLowerCase().localeCompare(b.equipment_name.toLowerCase()));
  }, [paginatedRows]);

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
              EQUIPO
              <span className="material-symbols-outlined helpp" title="Busca tus equipos guardados, por nombre.">
                help
              </span>
            </h1>
            <p
              style={{
                display: "flex",
                marginLeft: "0.3rem",
              }}
            >
              Busca tus equipos guardados, por nombre
            </p>
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
                No se pudo cargar los equipos.
              </div>
            )}
          </div>

          <form className="input-groups" style={{ marginBottom: "2rem" }} onSubmit={onSubmitBuscar}>
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
                {loading ? (
                  <tr>
                    <td colSpan={9}>
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
                {sortedRows.length ? (
                  sortedRows.map((item: EquipmentByProviderId, index: number) => (
                    <tr key={item._id}>
                      <td>{currentPage * itemsPerPage + index + 1}</td>
                      <td onClick={() => navigate(`/provider/materials`)} style={{ cursor: "pointer" }}>
                        {item.equipment_name}
                      </td>
                      <td>{item.equipment_code}</td>
                      <td>{item.equipment_provider}</td>
                      <td>{item.equipment_unit}</td>
                      <td>{item.stock ?? "0"}</td>
                      <td>{Formatter(item.equipment_unitary_price)}</td>
                      <td>{item.equipment_rud}</td>
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
                    <td colSpan={9} style={{ textAlign: "center", padding: "2rem" }}>
                      {submittedQuery ? "No hay resultados para esta búsqueda" : "No hay materiales guardados todavía"}
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
