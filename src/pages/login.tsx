import { useState } from "react";
import construimosLogo from "../assets/img/cidein_logo.png";
import { postDataNoToken } from "../api/fetchData";
import { dataSource } from "../api/datasources/datasources";
import { useAuth } from "../customHooks/auth/useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<undefined | boolean>(undefined);

  let serverReseponse = <p></p>;

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.append("userInfo", JSON.stringify({ username: name, password }));
    try {
      const result = await postDataNoToken(`${dataSource()}/user/login`, myForm);
      const parsedData = await result.json();
      if (result.status === 200) {
        login(parsedData);
      }

      if (result.status === 401) {
        setIsValid(true);
        serverReseponse = <p style={{ color: "ff0000" }}>Usuario o contraseña inválidos</p>;
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        <form className="cidein_form" onSubmit={handleSubmit}>
          <div className="form_input_container">
            <label htmlFor="username" className="button txt_secondary">
              USUARIO
            </label>
            <input type="text" name="username" id="username" placeholder="Nombre de usuario" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form_input_container">
            <label htmlFor="password" className="button  txt_secondary">
              CONTRASEÑA
            </label>
            <input type="password" name="password" id="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input_container">
            {isValid === undefined ? (
              <p></p>
            ) : isValid ? (
              <p style={{ color: "red", fontWeight: "bold", paddingTop: 16 }}>Usuario o contraseña inválidos...</p>
            ) : (
              <p></p>
            )}
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
