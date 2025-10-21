import cideinLogo from "../assets/img/cidein_logo.png";
import { Link } from "react-router-dom";

function LandingNavBar() {
  return (
    <nav id="landing_navbar">
      {/* Logo */}
      <div id="top_logo_name">
        <img id="logo" src={cideinLogo} alt="Cidein Logo" />
        <p id="landing_nav_title">CONSTRUÍMOS</p>
      </div>

      {/* Checkbox oculto */}
      <input
        type="checkbox"
        id="checkbox"
        className="nav-toggle"
        aria-hidden="true"
      />

      {/* Botón hamburguesa */}
      <label htmlFor="checkbox" className="menu" aria-label="Abrir/cerrar menú">
        <span />
        <span />
        <span />
      </label>

      {/* Menú navegación */}
      <ul className="navigation" id="navList">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/#/cliente">Cliente</a>
        </li>
        <li>
          <a href="/#/presupuestos">Presupuestos</a>
        </li>
        <li>
          <a href="/#/proveedores">Proveedor</a>
        </li>
        <li>
          <a href="/#/contratista">Contratista</a>
        </li>
        <li>
          <a href="/#/showroom">Constructores</a>
        </li>

        <li className="auth_buttons mobile-auth">
          <Link to="/login">
            <button className="boton-iniciar">Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button className="boton-registrate">Regístrate</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default LandingNavBar;
