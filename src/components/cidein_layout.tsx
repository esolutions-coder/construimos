import { useState } from "react";
import cideinLogoYellow from "../assets/img/cidein_logo_yellow.png";
import userImage from "../assets/img/user_image.png";

type CideinLayouProps = {
  children: React.ReactNode;
};

function CideinLayout({ children }: CideinLayouProps) {
  //When false the navbar is minimized
  const [leftNav, setLeftNav] = useState(false);
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
            <img src={userImage} alt="" />
            <p className="caption txt_primary">MIGUEL TAPIA</p>
          </div>
          <div className="left_nav_section">
            <div className="interests_title">
              <p className="caption txt_primary">TUS INTERESES</p>
            </div>
            <div className="layout_navbar_list">
              <ul>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">
                      architecture
                    </span>{" "}
                    <p>DISEÑOS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">
                      tools_power_drill
                    </span>{" "}
                    <p>REMODELACIONES</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">
                      tools_power_drill
                    </span>{" "}
                    <p>CONSTRUCCIÓN</p>
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
                    <span className="material-symbols-outlined">
                      architecture
                    </span>{" "}
                    <p>PRESUPUESTOS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">
                      tools_power_drill
                    </span>{" "}
                    <p>NÓMINAS</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span className="material-symbols-outlined">
                      tools_power_drill
                    </span>{" "}
                    <p>SG-SST</p>
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
              <li>
                <a href="">
                  <span className="material-symbols-outlined">home</span>
                  <p className="label">Inicio</p>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="material-symbols-outlined">add</span>
                  <p className="label">Añadir proyecto</p>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <p className="label">Notificaciones</p>
                </a>
              </li>
            </ul>
          </div>
          <div className="main_right_navbar">
            <div className="user_options_navbar">
              <img src={userImage} alt="" />
              <p className="caption txt_primary">MIGUEL TAPIA</p>
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default CideinLayout;
