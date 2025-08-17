import "../assets/styles/_nucontrs.scss";

type NumerosProps = {
  titulo: string;
  subtitulo: string;
  icono: JSX.Element;
};

function Numeroscon({ icono, titulo, subtitulo }: NumerosProps) {
  return (
    <div>
      <div className="iconoclienteks">{icono}</div>
      <h1 className="tituxks">{titulo}</h1>
      <p className="subtixks"> {subtitulo}</p>
    </div>
  );
}

export default Numeroscon;
