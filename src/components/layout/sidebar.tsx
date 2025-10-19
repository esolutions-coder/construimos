import { useState } from "react";
import cideinLogoYellow from "../../assets/img/cidein_logo_yellow.png";
import userImage from "../../assets/img/user_image.png";
import APP_LINKS from "../../mocks/sidebar.json";
import { Link } from "react-router-dom";

export default function Sidebar() {
  //When false the navbar is minimized
  const [leftNav, setLeftNav] = useState(false);

  return (
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
          <img src={userImage} alt="" />
          <p className="caption txt_primary">MIGUEL TAPIA</p>
        </div>
        {APP_LINKS.sections.map((section, index) => {
          return (
            <div className="left_nav_section" key={Math.random()}>
              <div className="section_title">
                <span className="material-symbols-outlined">{section.icon}</span>
                <p>{section.title}</p>
              </div>
              <div className="layout_navbar_list">
                <ul>
                  {section.options.map((option) => {
                    return (
                      <li key={Math.random()}>
                        <Link to={option.url}>
                          <span className="material-symbols-outlined">{option.icon}</span>
                          <p>{option.title}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
