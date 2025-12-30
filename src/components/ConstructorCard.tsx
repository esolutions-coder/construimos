import "../assets/styles/_containers.scss";
import { Link } from "react-router-dom";

interface ConstructorCardProps {
  nombre: string;
  imagen: string;
}

const ConstructorCard = ({ nombre, imagen }: ConstructorCardProps) => {
  return (
    <div className="item-imagen">
      <h6 className="nombre-constructor-card">{nombre}</h6>
      <img src={imagen} alt={nombre} />
      <Link to={`/constructores/${encodeURIComponent(nombre)}`}>
        <button className="btn_primary_theme">Conoce más...</button>
      </Link>
    </div>
  );
};

export default ConstructorCard;
