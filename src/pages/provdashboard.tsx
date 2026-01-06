import CideinLayoutProvedor from "../components/cidein_layout_provedor";
import "../assets/styles/_provdashboard.scss";
import materiales from "../assets/img/materiales.png";
import { Link } from "react-router-dom";
import { RoutesConstruimos } from "../utils/routes";

export default function ProvedorDashboard() {
  return (
    <CideinLayoutProvedor>
      <div className="containersss">
        <div className="row">
          <div className="col-12">
            <h1>
              PROVEEDOR: PANEL PRINCIPAL
              <span
                className="material-symbols-outlined helpp"
                title="Busca tus presupuestos guardados, por nombre, o por fecha."
              >
                help
              </span>{" "}
              <section className="grid-divs-prov">
                <Link to="/materialesprov/list">
                  <div
                    className="materiables_prov"
                    style={{ backgroundImage: `url(${materiales})` }}
                  >
                    <h1>MATERIALES</h1>
                  </div>
                </Link>

                <div className="mano_prov">
                  {" "}
                  <h1>MANO DE OBRA</h1>
                </div>
                <div className="transporte_prov">
                  {" "}
                  <h1>TRANSPORTE</h1>
                </div>
                <div className="anadir_prov">
                  {" "}
                  <h1>AÑADIR</h1>
                </div>
              </section>
            </h1>
          </div>
        </div>
      </div>
    </CideinLayoutProvedor>
  );
}
