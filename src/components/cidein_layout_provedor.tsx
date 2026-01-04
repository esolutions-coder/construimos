import { useState } from "react";
import cideinLogoYellow from "../assets/img/cidein_logo_yellow.png";
import { Link } from "react-router-dom";
import { RoutesConstruimos } from "../utils/routes";

import { useAuth } from "../customHooks/auth/useAuth";

type CideinLayouProps = {
  children: React.ReactNode;
};

export default function CideinLayoutProvedor({ children }: CideinLayouProps) {
  const [leftNav, setLeftNav] = useState(false);

  const { logout } = useAuth();

  const { user } = useAuth();
  return (
    <div className="layout_grid">
      <div className={`layout_left_navbar ${leftNav ? " " : "minimized"}`}>
        <div className="left_navbar_container">
          <div className="top_panel">
            <img src={cideinLogoYellow} alt="" />
            <div className="top_panel_search">
              <input type="text" placeholder="Buscar contenido" />
            </div>
            <span
              className="material-symbols-outlined txt_primary no_select"
              onClick={() => setLeftNav(!leftNav)}
            >
              menu
            </span>
          </div>
          <div className="user_section">
            <img
              src={user?.image || ""}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <p className="caption txt_primary">
              {" "}
              {user?.username || "Usuario"}
            </p>
          </div>
          <div className="left_nav_section">
            <div className="interests_title">
              <p className="caption txt_primary">MIS ELEMENTOS</p>
            </div>
            <div className="layout_navbar_list">
              <ul>
                <li>
                  <Link to={RoutesConstruimos.CREATENEWPRODUCT}>
                    <span className="material-symbols-outlined">
                      tools_power_drill
                    </span>

                    <p>Añadir materiales</p>
                  </Link>
                </li>
                <li>
                  <Link to={RoutesConstruimos.MATERIALS}>
                    <span className="material-symbols-outlined">
                      precision_manufacturing
                    </span>
                    <p>Añadir equipos</p>
                  </Link>
                </li>
                <li className="button_list">
                  <Link to={RoutesConstruimos.DASHBOARD}>
                    <span className="material-symbols-outlined">
                      front_hand
                    </span>
                    <p className="label">Mano de obra</p>
                  </Link>
                </li>
                <li className="button_list">
                  <Link to={RoutesConstruimos.DASHBOARD}>
                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                    <p className="label">Añadir transporte</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="left_nav_section"></div>
        </div>
      </div>
      <div className="right_section">
        <div className="layout_top_navbar">
          <div className="main_middle_navbar">
            <ul>
              <li className="button_list">
                <Link to={RoutesConstruimos.DASHBOARD}>
                  <span className="material-symbols-outlined">add_home</span>
                  <p className="label">Dashboard</p>
                </Link>
              </li>
              <li className="button_list">
                <Link to={RoutesConstruimos.MATERIALS}>
                  <span className="material-symbols-outlined">lists</span>{" "}
                  <p className="labels">Mis elementos</p>
                </Link>
              </li>
              <li className="button_list">
                <span className="material-symbols-outlined">notifications</span>
                <p className="label">Notificaciones</p>
              </li>
            </ul>
          </div>
          <div className="main_right_navbar">
            <div className="user_options_navbar">
              <img
                src={user?.image || ""}
                alt=""
                style={{ borderRadius: "50%" }}
              />
              <p className="caption txt_primary">
                {" "}
                {user?.username || "Usuario"}
              </p>
              <span
                className="material-symbols-outlined"
                style={{ color: "#fdbe33", cursor: "pointer" }}
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
