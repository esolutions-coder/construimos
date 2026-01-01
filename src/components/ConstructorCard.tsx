import { Link } from "react-router-dom";

interface ConstructorCardProps {
  nombre: string;
  imagen: string;
}

const ConstructorCard = ({ nombre, imagen }: ConstructorCardProps) => {
  return (
    <div className="item-imagen">
      <div className="imagen-wrapper">
        <img src={imagen} alt={nombre} />

        <Link to={`/constructores/${encodeURIComponent(nombre)}`}>
          <button className="btn_primary_theme">CONOCE MÁS</button>
        </Link>
      </div>
      <h6 className="nombre-constructor-card">{nombre}</h6>
    </div>
  );
};

export default ConstructorCard;
