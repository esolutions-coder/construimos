import { Link } from "react-router-dom";
import cideinLogo from "../assets/img/cidein_logo.png";
import { useAuth } from "../customHooks/auth/useAuth";
import { NAV_ITEMS_BY_ROLE } from "../utils/tipousuarios";
import { RoutesConstruimos } from "../utils/routes";

function LandingNavBar() {
  const { user, logout } = useAuth();

  const rawRole = user?.role ?? "VISITOR";
  const role = rawRole.toUpperCase() as keyof typeof NAV_ITEMS_BY_ROLE;

  const table = NAV_ITEMS_BY_ROLE ?? ({} as typeof NAV_ITEMS_BY_ROLE);
  const items = Array.isArray(table[role]) ? table[role] : [];
  //console.log(role);

  return (
    <nav id="landing_navbar">
      <div id="top_logo_name">
        <img id="logo" src={cideinLogo} alt="Cidein Logo" />
        <p id="landing_nav_title">CONSTRUÍMOS</p>
      </div>

      <input
        type="checkbox"
        id="checkbox"
        className="nav-toggle"
        aria-hidden="true"
      />
      <label htmlFor="checkbox" className="menu" aria-label="Abrir/cerrar menú">
        <span />
        <span />
        <span />
      </label>

      <ul className="navigation" id="navList">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}

        {!user ? (
          <li className="auth_buttons mobile-auth">
            <Link to={RoutesConstruimos.AUTH_LOGIN}>
              <button className="boton-iniciar">Iniciar Sesión</button>
            </Link>
            <Link to={RoutesConstruimos.AUTH_REGISTER}>
              <button className="boton-registrate">Regístrate</button>
            </Link>
          </li>
        ) : (
          <li className="auth_buttons mobile-auth">
            <Link to="/perfil">
              <button className="boton-registrate">
                {user.username?.split(" ")[0] ?? "Perfil"}
              </button>
            </Link>
            <button className="boton-iniciar" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default LandingNavBar;
