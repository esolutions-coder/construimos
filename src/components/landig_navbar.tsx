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
              <img
                src={user.image ?? "PeImarfil"}
                alt={user.username?.split(" ")[0] ?? "Perfil"}
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  border: "2px solid #030f27",
                  marginRight: "20px",
                }}
              />
            </Link>
            <span
              className="material-symbols-outlined"
              style={{
                color: "#030f27",
                cursor: "pointer",
                marginTop: "13px",
                marginRight: "20px",
              }}
              onClick={logout}
              title="Cerrar sesión"
            >
              exit_to_app
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default LandingNavBar;
