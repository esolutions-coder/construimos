import Lading_prov from "../components/landinbar_prov";
import Bannerprov from "../components/lading_provban";
import "../assets/styles/_benefics.scss";
import { IoCartOutline } from "react-icons/io5";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

function Proveedores() {
  return (
    <>
      <Lading_prov />
      <div className="section-foter">
        <Bannerprov />
      </div>

      <div className="section-foter1">
        <div className="container">
          <header className="main-header animate__animated animate__backInUp">
            <h1>Beneficios</h1>
            <p>
              Conecta con más clientes, optimiza tus procesos y aumenta tus
              ventas gracias a nuestras soluciones diseñadas especialmente para
              proveedores
            </p>
          </header>

          <section className="contents animate__animated animate__fadeInUp">
            <header className="section-header grind-item">
              <BsBoxSeam className="icon cajita" />
              <strong>Publica tu inventario</strong>
              <p className="iteso">
                Tus productos visibles para contratistas y clientes
              </p>
            </header>

            <article className="article animate__animated animate__pulse animate__delay-1s grind-item">
              <HiTrendingUp className="icon arribag" />
              <strong>Más ventas</strong>
              <p className="iteso">
                Conecta directamente con quienes necesitan tus materiales
              </p>
            </article>

            <article className="article animate__animated animate__pulse animate__delay-2s grind-item">
              <AiOutlineThunderbolt className="icon rayito" />
              <strong>Presupuestos automáticos</strong>
              <p className="iteso">
                Tus precios se integran a las cotizaciones de los contratistas
              </p>
            </article>

            <footer className="section-footer grind-item">
              <IoCartOutline className="icon carrito" />
              <strong>Promociona tu tienda</strong>
              <p className="iteso">Anuncia descuentos y productos destacados</p>
            </footer>
          </section>
        </div>
      </div>

      <div className="section-foter2">3</div>
      <div className="section-foter3">3</div>
    </>
  );
}

export default Proveedores;
