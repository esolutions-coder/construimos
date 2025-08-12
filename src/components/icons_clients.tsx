import "../assets/styles/_numclients.scss";

type NumerosProps = {
  titulo: string;
  subtitulo: string;
  icono: JSX.Element;
};

function Numeroscliente({ icono, titulo, subtitulo }: NumerosProps) {
  return (
    <div>
      <div className="iconocliente">{icono}</div>
      <h1 className="titux">{titulo}</h1>
      <p className="subtix"> {subtitulo}</p>
    </div>
  );
}

export default Numeroscliente;
