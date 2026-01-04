import { useMutation } from "@apollo/client";
import React, {
  ButtonHTMLAttributes,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { CREATE_USER } from "../assets/apus_queries/userQueries";
import construimosLogo from "../assets/img/cidein_logo_yellow.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RoutesConstruimos } from "../utils/routes";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const cleanForm = {
  username: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

type UserInfo = {
  username: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  nit?: string;
  location?: string;
  creationDate?: string;
  image?: string;
  description?: string;
  postalCode?: number;
  xp?: any[];
};

type RegisterResponse = {
  message: string;
  success: boolean;
  user: any;
  code: number;
};

type RegisterReducer =
  | {
      type: "changeValue";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: "cleanForm";
    };

export default function Register() {
  const [role, setRole] = useState("");
  const registerReducer = (state: UserInfo, action: RegisterReducer) => {
    switch (action.type) {
      case "changeValue":
        const inputName = action.payload.inputName;
        const inputValue = action.payload.inputValue;
        return { ...state, [inputName]: inputValue };
      case "cleanForm":
        return { ...cleanForm };
    }
  };
  const [createNewUser, { loading, data, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (data) {
      setRegisterState(data.addNewUser);
    }
  }, [data]);

  const [registerForm, dispatch] = useReducer(registerReducer, cleanForm);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    dispatch({
      type: "changeValue",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  const registerButton = useRef<HTMLButtonElement>(null);

  const saveUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await createNewUser({
        variables: {
          userData: {
            username: registerForm.username,
            password: registerForm.password,
            email: registerForm.email,
            role: registerForm.role,
            nit: "N/A",
            location: "N/A",
            creationDate: new Date().toISOString(),
            image: "default.png",
            description: "Usuario recién registrado",
            postalCode: 0,
            xp: [],
          },
        },
      });

      MySwal.fire({
        title: "Registro exitoso",
        text: "Inicia sesión para continuar",
        icon: "success",
        background: "#061840",
        color: "#ffd700",
      });

      dispatch({ type: "cleanForm" });
    } catch (err) {
      console.error(err);
      MySwal.fire({
        title: "Error",
        text: "No se pudo crear el usuario",
        icon: "error",
      });
    }
  };

  const [registerState, setRegisterState] = useState<RegisterResponse>();

  return (
    <div className="bg_secondary grid justify_content_sm_center min_height_100 alig_items_sm_center">
      <Link to={RoutesConstruimos.HOME}>
        <span
          style={{
            cursor: "pointer",
            color: "white",
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
      <div className="register_container">
        <div className="logo txt_center">
          <img src={construimosLogo} alt="" />
        </div>
        <h3 id="landing_nav_titles" className="txt_primary">
          CONSTRUIMOS
        </h3>
        <h6 className="txt_800 txt_center txt_primary">REGISTRO</h6>
        <p className="txt_primary">
          {registerState?.success
            ? "Usuario creado con exito"
            : registerState?.message}
        </p>
        <p className="txt_primary"></p>
        <form className="cidein_form">
          <div className="form_input_container">
            <label htmlFor="username" className="button txt_primary">
              USUARIO
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de usuario"
              value={registerForm.username}
              onChange={handleChange}
            />
          </div>
          <div className="form_input_container">
            <label htmlFor="email" className="button txt_primary">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Nombre de usuario"
              value={registerForm.email}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div className="form_input_container">
            <label htmlFor="password" className="button txt_primary">
              CONTRASEÑA
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={registerForm.password}
              required={true}
              onChange={handleChange}
            />
          </div>
          <div className="form_input_container">
            <label htmlFor="confirmPassword" className="button txt_primary">
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              required={true}
              value={registerForm.confirmPassword}
              onChange={handleChange}
            />
            <label
              htmlFor="role"
              className="button  txt_primary"
              style={{ marginTop: "10px" }}
              onClick={() => setRole("")}
            >
              TIPO DE USUARIO
            </label>
            <select
              name="role"
              id="role"
              value={registerForm.role}
              onChange={(e) =>
                dispatch({
                  type: "changeValue",
                  payload: { inputName: "role", inputValue: e.target.value },
                })
              }
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="CONTRATISTA">CONTRATISTA</option>
              <option value="PROVEEDOR" id="proveedor">
                PROVEEDOR
              </option>

              <option value="SOPORTE">SOPORTE</option>
            </select>
          </div>

          <div className="procced_login flex flex_sm_colum gap_sm_12">
            <Link to={RoutesConstruimos.AUTH_LOGIN} className="txt_primary">
              ¿Tienes cuenta? - Inicia sesión
            </Link>

            <button
              className="btn primary_theme"
              onClick={saveUser}
              ref={registerButton}
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
