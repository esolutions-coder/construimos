import { useEffect, useState } from "react";
import InputBox from "../../components/inputElement";
import { useMutation } from "@apollo/client";
import CideinWarning from "../../components/warning";
import Toast from "../../components/layout/toast";
import { CREATE_ACTIVITY } from "../../assets/ats_queries/activity.mutation";

export default function CreateActivity() {
  const [saveActivity, {error, loading, data}] = useMutation(CREATE_ACTIVITY, {refetchQueries: ["ActivitiesList"]})
  
  const [name, setName] = useState("")
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    saveActivity({
      variables: {
        activityData: {
          name
        }
      }
    })
  };

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = evt.target.value;
    setName(value);
  };

  const [toast, setToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    title: "Titulo del toast",
    body: "Cuerpo del toast",
    footer: "Footer del toast",
    theme: "primary_theme",
  });

  useEffect(() => {
    if (loading) {
      setToastProps({
        title: "Creación de actividad",
        body: "Se está procesando la creación de la actividad",
        footer: "Exito",
        theme: "primary_theme",
      });
      setToast(true);
    }
    if (data) {
      setToastProps({
        title: "Creación de actividad",
        body: "Actividad creada con éxito",
        footer: "Exito",
        theme: "primary_theme",
      });
      setToast(true);
    }
    if (error) {
      setToastProps({
        title: "Creación de actividad",
        body: "Error creando la actividad",
        footer: "Exito",
        theme: "error_theme",
      });
      setToast(true);
    }
  }, [loading, error, data]);

  return (
    <>
    <Toast
        title={toastProps.title}
        body={toastProps.body}
        theme={toastProps.theme}
        footer={toastProps.footer}
        isActive={toast}
        setToast={setToast}
      />
    <form onSubmit={handleSubmit}>
      <InputBox
        inputName="newActivity"
        isEmpty={false}
        labelTag="Nombre de actividad"
        onChange={handleChange}
        type="text"
        value={name}
        disabled={false}
      />
      <button type="submit" className="btnPrimary btnSmall">
        Guardar nueva actividad
      </button>
    </form>
    </>
  );
}
