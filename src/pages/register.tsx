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

const MySwal = withReactContent(Swal);

const cleanForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type UserInfo = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  const [createNewUser, { loading, data, error }] = useMutation(CREATE_USER);

  const registerButton = useRef<HTMLButtonElement>(null);

  const saveUser = () => {
    MySwal.fire({
      title: "Registro exitoso",
      text: "Inicia sesión para continuar",
      icon: "success",
      background: "#061840",
      color: "#ffd700",
    });

    createNewUser({
      variables: {
        userData: {
          username: registerForm.username,
          password: registerForm.password,
          email: registerForm.email,
          role: "admin",
        },
      },
    });
    dispatch({
      type: "cleanForm",
    });
    if (registerButton.current) {
      registerButton.current.setAttribute("disabled", "true");
    }
  };
  const [registerState, setRegisterState] = useState<RegisterResponse>();
  useEffect(() => {
    if (data) {
      setRegisterState(data.addNewUser);
    }
  }, [data]);

  return (
    <div className="bg_secondary grid justify_content_sm_center min_height_100 alig_items_sm_center">
      <div>
        <div className="logo txt_center">
          <img src={construimosLogo} alt="" />
        </div>
        <h3 id="landing_nav_title" className="txt_primary">
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
              value={registerForm.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="procced_login flex flex_sm_colum gap_sm_12">
            <a href="/#/login" className="txt_primary">
              ¿Tienes cuenta? - Inicia sesión
            </a>

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
