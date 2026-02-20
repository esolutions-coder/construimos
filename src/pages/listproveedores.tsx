import { useQuery, useMutation } from "@apollo/client";
import { useState, useMemo } from "react";
import { useAuth } from "../customHooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT_BUDGET } from "../api/budgets/projects.mutations";
import { GET_MATERIALS_BY_PROVIDER_ID } from "../api/materials/materials.query";
import { usePages } from "../customHooks/auth/usePages";
import { MaterialsByProviderId } from "../utils/list_types";
import CideinWarning from "../components/warning";
import ActionsMenu from "../components/actionsmenu";
import Formatter from "../utils/formatter";
import CideinLayoutProvedor from "../components/cidein_layout_provedor";
import Loading from "../components/loading";

export default function ListaProveedores() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [warningProps, setWarningProps] = useState({
    warningState: false,
    message: "Mensaje",
    color: "primary_theme",
    icon: "info",
  });

  const helpfulAlert = (message: string, color: string, time: number, icon: string) => {
    setWarningProps({
      message,
      warningState: true,
      icon,
      color,
    });

    setTimeout(() => {
      setWarningProps({
        message: "",
        warningState: false,
        icon: "info",
        color: "primary_theme",
      });
    }, time * 1000);
  };

  const { loading, error, data } = useQuery(GET_MATERIALS_BY_PROVIDER_ID, {
    variables: { providerId: user?._id },
    skip: !user?._id,
  });

  const [deleteProject, { loading: deletingProject }] = useMutation(DELETE_PROJECT_BUDGET);

  const rows = useMemo(() => {
    return (data?.materialsByProviderId ?? []).map((p: MaterialsByProviderId) => ({
      _id: p._id,
      material_name: p.material_name,
      material_code: p.material_code,
      material_unit: p.material_unit,
      material_unitary_price: p.material_unitary_price,
      stock: p.stock,
    }));
  }, [data]);

  const { paginatedRows, totalPages, currentPage, itemsPerPage, setCurrentPage, submittedQuery, setSubmittedQuery } =
    usePages<MaterialsByProviderId>({
      rows,
      itemsPerPage: 20,
      searchFn: (row, query) => row.material_name.toLowerCase().includes(query),
    });

  const sortedRows = useMemo(() => {
    return [...paginatedRows].sort((a, b) => a.material_name.toLowerCase().localeCompare(b.material_name.toLowerCase()));
  }, [paginatedRows]);

  const onSubmitBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

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
              MATERIALES
              <span className="material-symbols-outlined helpp" title="Busca tus materiales guardados, por nombre.">
                help
              </span>{" "}
            </h1>

            <p style={{ display: "flex", marginLeft: "0.3rem" }}> Busca tus materiales guardados por nombre</p>

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
                No se pudo cargar los materiales.
              </div>
            )}
          </div>

          <form className="input-groups" style={{ marginBottom: "2rem" }} onSubmit={onSubmitBuscar}>
            <input
              value={query}
              type="text"
              placeholder="BUSCAR MATERIAL"
              onChange={(e) => setQuery(e.target.value)}
              className="input-gr"
            />
            <button type="submit" className="btn_buscar_presupuestoss">
              BUSCAR
            </button>
          </form>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NOMBRE</th>
                  <th>CODIGO</th>
                  <th>UNIDAD</th>
                  <th>STOCK</th>
                  <th>PRECIO</th>
                  <th>OPCIONES</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
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
                  sortedRows.map((item: MaterialsByProviderId, index: number) => (
                    <tr key={item._id}>
                      <td>{currentPage * itemsPerPage + index + 1}</td>
                      <td onClick={() => navigate(`/provider/materials`)} style={{ cursor: "pointer" }}>
                        {item.material_name}
                      </td>
                      <td>{item.material_code}</td>
                      <td>{item.material_unit ?? "0"}</td>
                      <td>{item.stock ?? "0"}</td>
                      <td>{Formatter(item.material_unitary_price)}</td>
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
                    <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
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
