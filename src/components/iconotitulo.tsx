import "../assets/styles/_iconotitulo.scss";

type NumerosProps = {
  subtitulo: string;
  icono: JSX.Element;
};

function Numeroscliente2({ icono, subtitulo }: NumerosProps) {
  return (
    <div className="item-numeros">
      <div className="iconoz">{icono}</div>
      <div className="subtsss">{subtitulo}</div>
    </div>
  );
}

export default Numeroscliente2;
