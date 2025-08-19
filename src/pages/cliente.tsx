import LandingNavBar from "../components/landig_navbar";
import Bannercliente from "../components/bannercliente";
import "../assets/styles/_bannerclient.scss";
import "../assets/styles/_sesiondos.scss";
import rojoclient from "../assets/img/rojoclient.png";
import { PiNumberCircleOneFill } from "react-icons/pi";
import Numeroscliente from "../components/icons_clients";
import { PiNumberCircleFourFill } from "react-icons/pi";
import { PiNumberCircleThreeFill } from "react-icons/pi";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import { PiNumberCircleFiveFill } from "react-icons/pi";
import "../assets/styles/_qpencontrar.scss";
import Numeroscliente2 from "../components/iconotitulo";
import { LuPaintbrushVertical } from "react-icons/lu";
import { LuDrill } from "react-icons/lu";
import { GiHouse } from "react-icons/gi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { LuAxe } from "react-icons/lu";
import { FaFaucetDrip } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdDesignServices } from "react-icons/md";
import "../assets/styles/_constbut.scss";
import CideinFooter from "../components/cidein_footer";
import cideinLogo from "../assets/img/cidein_logo.png";

function Clientes() {
  return (
    <>
      <LandingNavBar />
      <Bannercliente />
      <div className="sesiondos">
        <nav className="imagencliente">
          <img src={rojoclient} alt="logocliente" className="rojocliente" />
        </nav>

        <section className="apartadoiconos">
          <Numeroscliente
            icono={<PiNumberCircleOneFill />}
            titulo="Contratistas calificados."
            subtitulo="Encuentra profesionales verificados para cada tipo de obra."
          />
          <Numeroscliente
            icono={<PiNumberCircleTwoFill />}
            titulo="Cotizaciones rápidas"
            subtitulo="Solicita, compara y elige la mejor opción sin complicaciones."
          />
          <Numeroscliente
            icono={<PiNumberCircleThreeFill />}
            titulo="Personal para trabajos"
            subtitulo="Localiza mano de obra disponible según tus necesidades."
          />
          <Numeroscliente
            icono={<PiNumberCircleFourFill />}
            titulo="Gestión de proyectos"
            subtitulo="Mantén el control de cada etapa de tu obra en un solo panel."
          />
          <Numeroscliente
            icono={<PiNumberCircleFiveFill />}
            titulo="Soporte y asesoría"
            subtitulo="Recibe ayuda para tomar decisiones informadas."
          />
        </section>
      </div>
      <div className="containerc">
        <header className="main-headerc">
          <h1 className="h1titulo">¿Qué puedes encontrar?</h1>
          <p className="p1rrafo">
            Encuentra soluciones pertinentes para los problemas que puedas
            presentar
          </p>
        </header>

        <section className="contentc">
          <div className="tituloeicono">
            <Numeroscliente2
              icono={<LuPaintbrushVertical />}
              subtitulo="Pintura"
            />
            <Numeroscliente2 icono={<LuDrill />} subtitulo="Remodelaciones" />
            <Numeroscliente2 icono={<GiHouse />} subtitulo="Cielos rasos" />
            <Numeroscliente2
              icono={<MdOutlineCheckBoxOutlineBlank />}
              subtitulo="Pisos"
            />
            <Numeroscliente2 icono={<FaTools />} subtitulo="Construcción" />
            <Numeroscliente2 icono={<LuAxe />} subtitulo="Carpintería" />
            <Numeroscliente2 icono={<FaFaucetDrip />} subtitulo="Plomería" />
            <Numeroscliente2
              icono={<AiFillThunderbolt />}
              subtitulo="Electricidad"
            />
            <Numeroscliente2 icono={<MdDesignServices />} subtitulo="Diseños" />
          </div>
        </section>
      </div>
      <div className="containerp">
        <section className="contentp">
          <header className="section-headerp align-header">
            <img id="logo" src={cideinLogo} alt="" />
            <p id="landing_nav_title">CONSTRUÍMOS</p>
          </header>
          <button className="btn-presupuesto">Pide tu presupuesto</button>
        </section>
      </div>
      <CideinFooter />
    </>
  );
}

export default Clientes;
