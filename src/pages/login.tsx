import construimosLogo from "../assets/img/cidein_logo.png";
export default function Login() {
  return (
    <div className="bg_primary grid justify_content_sm_center min_height_100 alig_items_sm_center">
      <div>
        <div className="logo txt_center">
          <img src={construimosLogo} alt="" />
        </div>
        <h3 id="landing_nav_title" className="txt_secondary">
          CONSTRUIMOS
        </h3>
        <h6 className="txt_800 txt_center txt_secondary">INICIAR SESIÓN</h6>

        <form className="cidein_form">
          <div className="form_input_container">
            <label htmlFor="username" className="button txt_secondary">
              USUARIO
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="form_input_container">
            <label htmlFor="password" className="button  txt_secondary">
              CONTRASEÑA
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="procced_login flex flex_sm_colum gap_sm_12">
            <a href="/#/register" className="txt_secondary">
              ¿No tienes cuenta? - Regístrate
            </a>
            <button className="btn secondary_theme">Iniciar sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
}
