import CideinLayoutProvedor from "../components/cidein_layout_provedor";

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
            </h1>
          </div>
        </div>
      </div>
    </CideinLayoutProvedor>
  );
}
