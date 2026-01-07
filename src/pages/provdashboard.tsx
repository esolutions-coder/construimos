import CideinLayoutProvedor from "../components/cidein_layout_provedor";
import "../assets/styles/_provdashboard.scss";
import materiales from "../assets/img/materiales.png";
import manodobra from "../assets/img/manodobra.png";
import transportep from "../assets/img/transportep.png";
import equipop from "../assets/img/equipop.png";
import { ProviderCards } from "../components/providercards";

export default function ProvedorDashboard() {
  return (
    <>
      <CideinLayoutProvedor>
        <div className="title-section">
          <h1>PROVEEDOR DASHBOARD</h1>
          <p>
            Tu panel de proveedor, con tus materiales, mano de obra y transporte{" "}
            <strong style={{ color: "#fdbe33" }}>
              Para ver las funcionalidades de cada sección, haz click en la
              imagen.
            </strong>
          </p>
        </div>
        <section className="grid-divs-prov">
          <ProviderCards
            url="/materialesprovider/list"
            nombre="MATERIALES"
            imagen={materiales}
            title="MATERIALES"
          />
          <ProviderCards
            url="/manodeobraprovider/list"
            nombre="MANO DE OBRA"
            imagen={manodobra}
            title="MANO DE OBRA"
          />
          <ProviderCards
            url="/transporteprovider/list"
            nombre="TRANSPORTE"
            imagen={transportep}
            title="TRANSPORTE"
          />
          <ProviderCards
            url="/equipoprovider/list"
            nombre="EQUIPO"
            imagen={equipop}
            title="EQUIPO"
          />
        </section>
      </CideinLayoutProvedor>
    </>
  );
}
