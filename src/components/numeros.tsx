import "../assets/styles/_numeros.scss";

type NumerosProps = {
  titulo: string;
  subtitulo: string;
  icono: JSX.Element;
};

function Numeros({ icono, titulo, subtitulo }: NumerosProps) {
  return (
    <div>
      <div className="icono">{icono}</div>
      <h1 className="titulos">{titulo}</h1>
      <p className="subtitulos"> {subtitulo}</p>
    </div>
  );
}

export default Numeros;
