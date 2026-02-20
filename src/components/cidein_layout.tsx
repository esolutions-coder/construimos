import { useState } from "react";
import cideinLogoYellow from "../assets/img/cidein_logo_yellow.png";
import { Link } from "react-router-dom";
import { RoutesConstruimos } from "../utils/routes";
import Notification from "./Notification";

import { useAuth } from "../customHooks/auth/useAuth";

type CideinLayouProps = {
  children: React.ReactNode;
};

function CideinLayout({ children }: CideinLayouProps) {
  const [leftNav, setLeftNav] = useState(false);

  const { user } = useAuth();

  const { logout } = useAuth();
  return (
    <div className="layout_grid">
      <div className={`layout_left_navbar ${leftNav ? " " : "minimized"}`}>
        <div className="left_navbar_container">
          <div className="top_panel">
            <img src={cideinLogoYellow} alt="" />
            <div className="top_panel_search">
              <input type="text" placeholder="Buscar contenido" />
            </div>
            <span className="material-symbols-outlined txt_primary no_select" onClick={() => setLeftNav(!leftNav)}>
              menu
            </span>
          </div>
          <div className="user_section">
            <img
              src={user?.image || ""}
              alt=""
              style={{
                borderRadius: "50%",
                border: "2px solid #fdbe33",
                width: "40px",
                height: "40px",
              }}
            />
            <p className="caption txt_primary"> {user?.username || "Usuario"}</p>
          </div>
          <div className="left_nav_section">
            <div className="interests_title">
              <p className="caption txt_primary">TUS INTERESES</p>
            </div>
            <div className="layout_navbar_list">
              <ul>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">architecture</span> <p>DISEÑOS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">tools_power_drill</span> <p>REMODELACIONES</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">tools_power_drill</span> <p>CONSTRUCCIÓN</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="left_nav_section">
            <div className="interests_title">
              <p className="caption txt_primary">APLICACIONES - CONTRATISTA</p>
            </div>
            <div className="layout_navbar_list">
              <ul>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">architecture</span> <p>PRESUPUESTOS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">tools_power_drill</span> <p>NÓMINAS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">tools_power_drill</span> <p>SG-SST</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="right_section">
        <div className="layout_top_navbar">
          <div className="main_middle_navbar">
            <ul>
              <li className="button_list">
                <Link to={RoutesConstruimos.HOME}>
                  <span className="material-symbols-outlined">home</span>
                  <p className="label">Inicio</p>
                </Link>
              </li>
              <li className="button_list">
                <Link to={RoutesConstruimos.PRESUPUESTOS}>
                  <span className="material-symbols-outlined">add</span>
                  <p className="label">Añadir proyecto</p>
                </Link>
              </li>
              <Notification subtitle="Notificaciones" />

              <li className="button_list">
                <Link to={RoutesConstruimos.PRESUPUESTOS_LIST}>
                  <span className="material-symbols-outlined">List</span>
                  <p className="labels">Tus presupuestos</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="main_right_navbar">
            <div className="user_options_navbar">
              <img
                src={user?.image || ""}
                alt=""
                style={{
                  borderRadius: "50%",
                  border: "2px solid #fdbe33",
                  width: "50px",
                  height: "50px",
                }}
              />
              <p className="caption txt_primary"> {user?.username || "Usuario"}</p>
              <span
                className="material-symbols-outlined"
                style={{
                  color: "#fdbe33",
                  cursor: "pointer",
                  position: "absolute",
                  right: "6rem",
                }}
                onClick={logout}
                title="Cerrar sesión"
              >
                exit_to_app
              </span>
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default CideinLayout;
