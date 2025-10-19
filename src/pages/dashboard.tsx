import Sidebar from "../components/layout/sidebar";
import "../assets/styles/_dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard-details">
      <Sidebar />
      <h1 className="dashboardtitulo">RENDIMIENTOS</h1>
      <div className="ventas-totales">
        <h2 className="subtitulomini">Ventas totales</h2>
        <span className="ventasnumero">$ 100K</span>
      </div>
      <div className="ordenes">
        <h2 className="subtitulomini">Ordenes</h2>
        <span className="ordenesnumero">$ 100K</span>
      </div>
      <div className="productosvendidos">
        <h2 className="subtitulomini">Productos vendidos</h2>
        <span className="productosnumero">$ 100K</span>
      </div>
      <h1 className="graficos">GRÁFICOS</h1>

      <div className="grafvenord">
        <div className="apartadogris">
          <h1 className="vent-ord">Ventas totales</h1>
        </div>
      </div>
      <div className="graford">
        <div className="apartadogris">
          <h1 className="vent-ord">Órdenes</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
