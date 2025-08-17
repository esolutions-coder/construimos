import "../assets/styles/_numcof.scss";

type NumerosProps = {
  titulo: string;
  subtitulo: string;
  icono: JSX.Element;
};

function Numr({ icono, titulo, subtitulo }: NumerosProps) {
  return (
    <div>
      <div className="iconoclienteksd">{icono}</div>
      <h1 className="tituxksd">{titulo}</h1>
      <p className="subtixksd"> {subtitulo}</p>
    </div>
  );
}

export default Numr;
