import LandingNavBar from "../components/landig_navbar";
import Bannercontratista from "../components/ladingcontratista";
import "../assets/styles/_bancontra.scss";
import "../assets/styles/_beneficontratis.scss";
import { IoNewspaper } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import "../assets/styles/_contrap3.scss";
import laptop from "../assets/img/laptop.png";
import { PiNumberCircleOneFill } from "react-icons/pi";
import { PiNumberCircleFourFill } from "react-icons/pi";
import { PiNumberCircleThreeFill } from "react-icons/pi";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import twopersonsc from "../assets/img/twopersonsc.png";
import Numeroscontratista from "../components/icons_contratista";
import Numeroscon from "../components/numeroscontxx";
import "../assets/styles/_contra4.scss";
import compui from "../assets/img/compui.png";
import "../assets/styles/_contra5.scss";
import Numr from "../components/numr";
import CideinFooter from "../components/cidein_footer";

function Contratista() {
  return (
    <>
      <LandingNavBar />
      <div className="section-foterx">
        <Bannercontratista />
      </div>
      <div className="mainx">
        <div className="main-header">
          <h1>Beneficios</h1>
          <p>
            Conecta con más clientes, optimiza tus procesos y aumenta tus ventas
            gracias a nuestras soluciones diseñadas especialmente para
            proveedores
          </p>
        </div>
        <content className="contentsx">
          <div className="section-headerx grind-item">
            <div className="card-content">
              <IoNewspaper className="iconx cajita" />
              <strong className="titxlos">Creación de presupuestos</strong>
              <p className="itesox">
                Crea presupuestos con precios actuales de forma rápida y eficaz
              </p>
            </div>
          </div>

          <div className="section-headerx  grind-item">
            <div className="card-content">
              <MdSecurity className="iconx rayito" />
              <strong className="titxlos">SG-SST</strong>
              <p className="itesox">
                Gestiona el Sistema de Gestión de Seguridad y Salud en el
                Trabajo
              </p>
            </div>
          </div>
          <div className="section-headerx grind-item">
            <div className="card-content">
              <IoMdPerson className="iconx carrito" />
              <strong className="titxlos">Clientes</strong>
              <p className="itesox">Encuentra a personas que te necesiten</p>
            </div>
          </div>
        </content>
      </div>
      <div className="containerph">
        <div className="main-header">
          <h1 className="tixtsss">Creación de presupuestos</h1>
          <p className="paxfo">
            Construimos pone a tu disposición precios, rendimientos y lo más
            importante contactos de cientos <br />
            de materiales, equipos, herramientas para que puedas formular tus
            proyectos acertadamente
          </p>
        </div>
        <nav className="contnavpx">
          <img src={laptop} className="imagenlaptop" alt="laptop" />
        </nav>
        <aside className="contentph">
          <Numeroscontratista
            icono={<PiNumberCircleOneFill />}
            titulo="Selecciona categoría"
            subtitulo="Busca entre materiales, equipós mano de obras o APUS"
          />
          <Numeroscontratista
            icono={<PiNumberCircleTwoFill />}
            titulo="Introduce palabra clave"
            subtitulo="Introduce tu criterio de búsqueda"
          />
          <Numeroscontratista
            icono={<PiNumberCircleThreeFill />}
            titulo="Añade a tu presupuesto"
            subtitulo="Una vez encuentres lo que buscas añadelos a tu presupuesto"
          />
          <Numeroscontratista
            icono={<PiNumberCircleFourFill />}
            titulo="Precios al día"
            subtitulo="Todos los materiales, herramientas, equipos y mano de obra tienen precios actuales y por región"
          />
        </aside>
      </div>
      <div className="containerphx">
        <div className="main-header">
          <h1 className="tixtsssx">Conecta con tus clientes</h1>
          <p className="paxfox">
            Ya sea que ellos te contacten a tí o tu contactes con ellos, te
            brindamos <br />
            las herramientas para llevar a cabo esa conexión
          </p>
        </div>

        <nav className="contnavpxx">
          <Numeroscon
            icono={<PiNumberCircleOneFill />}
            titulo="Selecciona categoría"
            subtitulo="Busca entre materiales"
          />
          <Numeroscon
            icono={<PiNumberCircleTwoFill />}
            titulo="Introduce palabra clave"
            subtitulo="Introduce tu criterio de búsqueda"
          />
          <Numeroscon
            icono={<PiNumberCircleThreeFill />}
            titulo="Añade a tu presupuesto"
            subtitulo="Una vez encuentres "
          />
          <Numeroscon
            icono={<PiNumberCircleFourFill />}
            titulo="Prescios al día"
            subtitulo="Todos los materiales"
          />{" "}
        </nav>
        <aside className="acidepersons">
          <img src={twopersonsc} className="contratust" alt="contratust" />
        </aside>
      </div>
      <div className="containerphxi">
        <header className="main-header">
          <h1 className="tixtsssxi">
            Sistemas de Gestión - Seguridad y salud <br />
            en el trabajo
          </h1>
          <p className="paxfoxi">
            Desde la documentación de tus colaboradores hasta los permisos de
            trabajo necesarios para ejecutar tus actividades, <br /> todo en un
            solo lugar
          </p>
        </header>
        <nav className="navsistemas">
          <img src={compui} className="contratusti" alt="contratusti" />
        </nav>
        <aside className="contentph">
          <Numr
            icono={<PiNumberCircleOneFill />}
            titulo="Selecciona categoría"
            subtitulo="Busca entre materiales, "
          />
          <Numr
            icono={<PiNumberCircleTwoFill />}
            titulo="Introduce palabra clave"
            subtitulo="Introduce tu criterio de búsqueda"
          />
        </aside>
      </div>
      <CideinFooter />
    </>
  );
}

export default Contratista;
