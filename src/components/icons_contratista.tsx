import "../assets/styles/_numcontratista.scss";

type NumerosProps = {
  titulo: string;
  subtitulo: string;
  icono: JSX.Element;
};

function Numeroscontratista({ icono, titulo, subtitulo }: NumerosProps) {
  return (
    <div>
      <div className="iconoclientek">{icono}</div>
      <h1 className="tituxk">{titulo}</h1>
      <p className="subtixk"> {subtitulo}</p>
    </div>
  );
}

export default Numeroscontratista;
