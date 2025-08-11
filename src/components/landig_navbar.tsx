import cideinLogo from "../assets/img/cidein_logo.png";

function LandingNavBar() {
  return (
    <nav id="landing_navbar">
      <div id="top_logo_name">
        <img id="logo" src={cideinLogo} alt="" />
        <p id="landing_nav_title">CONSTRUÍMOS</p>
      </div>
      <div id="bottom_nav">
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="#">Cliente</a>
          </li>
          <li>
            <a href="/#/presupuestos">Contratista</a>
          </li>
          <li>
            <a href="/#/proveedores">Proveedor</a>
          </li>
          <li>
            <a href="/#/showroom">Constructores</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingNavBar;
