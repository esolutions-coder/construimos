import Lading_prov from "../components/landinbar_prov";
import Bannerprov from "../components/lading_provban";
import "../assets/styles/_benefics.scss";
import { IoCartOutline } from "react-icons/io5";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import "../assets/styles/_section3.scss";
import { PiNumberCircleOneFill } from "react-icons/pi";
import Numeros from "../components/numeros";
import { PiNumberCircleThreeFill } from "react-icons/pi";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import "../assets/styles/_sev3.scss";
import altavoz from "../assets/img/altavoz.png";
import herramientas from "../assets/img/herramientas.png";
import "../assets/styles/_sectioncuatro.scss";
import CideinFooter from "../components/cidein_footer";
import { FiFacebook } from "react-icons/fi";

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
      <div className="section-fot">
        <div className="containerrse">
          <nav className="main-naver">
            <h1 className="titulo">¿Cómo funciona?</h1>
            <p className="parrafo">
              Conéctate con clientes y crece en tres simples pasos
            </p>
          </nav>

          <aside className="sidebarar ">
            <Numeros
              icono={<PiNumberCircleOneFill />}
              titulo="Regístrate en la plataforma"
              subtitulo="Completa tu perfil de proveedor con tu información y catálogo de productos."
            />
            <Numeros
              icono={<PiNumberCircleTwoFill />}
              titulo="Recibe solicitudes y pedidos"
              subtitulo="Los clientes interesados te contactarán directamente desde nuestro portal."
            />
            <Numeros
              icono={<PiNumberCircleThreeFill />}
              titulo="Vende y haz crecer tu negocio"
              subtitulo="Gestiona tus pedidos y amplia tu red de clientes con facilidad."
            />
          </aside>
        </div>
      </div>
      <div className="section-foterrrer">
        <header className="headerfot">
          <p className="parrafoarriba">A UN CLICK DE SABER MÁS</p>
          <h1 className="titulx">¿Quieres más información?</h1>
          <p className="parrafoabajo">
            Dejanos un mensaje con tus dudas y en breve las resolveremos
          </p>
        </header>
        <nav className="navfoty">
          <img className="logofots" src={altavoz} alt="logo" />
        </nav>
        <aside className="sid">
          <form className="formulario">
            <h5 className="infoput">Nombre</h5>
            <input type="text" placeholder="Tu nombre" />
            <h5 className="infoput">E-mail</h5>
            <input type="text" placeholder="correo@lorem.fun" />
            <h5 className="infoput">Mensaje</h5>
            <textarea
              placeholder="Quiero saber cómo puedo hacer la portabilidad de todo mi inventario"
              className="textarea w-full h-28 bg-[#030c26] text-white border border-white/25 rounded-md p-3 text-base resize-none"
            />
          </form>
          <button className="env-msg">ENVIAR MENSAJE</button>
        </aside>
        <footer className="section-foot ">
          <img
            className="logoherramientas"
            src={herramientas}
            alt="logoherramientas"
          />
        </footer>
      </div>
      <div className="sectioncuatro">
        <nav className="navcuatro">
          <h1 className="titulocuatro">
            Oportunidades como esta
            <br />
            no se dejan pasar
          </h1>
          <p className="subtitulocuatro">
            A caballo regalado no se le miran los dientes dirian por ahí,
            regístrate, sube tu inventario <br />y deja que la comunidad de
            contratistas haga el resto
          </p>
          <button className="btnregistrateya">REGISTRATE</button>
        </nav>
      </div>
      <CideinFooter />
    </>
  );
}

export default Proveedores;
