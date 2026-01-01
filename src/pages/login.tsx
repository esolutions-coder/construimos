import { useEffect, useState } from "react";
import construimosLogo from "../assets/img/cidein_logo.png";
import { postDataNoToken } from "../api/fetchData";
import { dataSource, imagesSource } from "../api/datasources/datasources";
import { useAuth } from "../customHooks/auth/useAuth";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../api/budgets/projects.queries";
import { Link } from "react-router-dom";
import { RoutesConstruimos } from "../utils/routes";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isValid, setIsValid] = useState<undefined | boolean>(undefined);

  const [submit, { data, loading, error }] = useLazyQuery(LOGIN_USER, {
    variables: {
      login: {
        name: name,
        password: password,
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <>
      <div className="bg_primary grid justify_content_sm_center min_height_100 alig_items_sm_center">
        <Link to={RoutesConstruimos.HOME}>
          <span
            style={{
              cursor: "pointer",
              color: "black",
              left: "0",
              top: "0",
              marginLeft: "1rem",
              marginTop: "1rem",
              position: "absolute",
            }}
            className="material-symbols-outlined"
          >
            {" "}
            arrow_back{" "}
          </span>
        </Link>
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
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nombre de usuario"
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="role" className="button  txt_secondary">
                TIPO DE USUARIO
              </label>
              <select
                name="role"
                id="role"
                placeholder="Tipo de usuario"
                //onChange={(e) => setRole(e.target.value)}
              >
                <option value="CLIENTE">CLIENTE</option>
                <option value="CONTRATISTA">CONTRATISTA</option>
                <option value="PROVEEDOR">PROVEEDOR</option>
                <option value="SOPORTE">SOPORTE</option>
              </select>
            </div>
            <div className="input_container">
              {isValid === undefined ? (
                <p></p>
              ) : isValid ? (
                <p style={{ color: "red", fontWeight: "bold", paddingTop: 16 }}>
                  Usuario o contraseña inválidos...
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <div className="procced_login flex flex_sm_colum gap_sm_12">
              <a href="/#/register" className="txt_secondary">
                ¿No tienes cuenta? - Regístrate
              </a>
              <button className="btn secondary_theme" type="submit">
                Iniciar sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
