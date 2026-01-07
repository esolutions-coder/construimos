import { Link } from "react-router-dom";

interface ConstructorCardProps {
  url: string;
  nombre: string;
  imagen: string;
  title: string;
}

export const ProviderCards = ({
  url,
  nombre,
  imagen,
  title,
}: ConstructorCardProps) => {
  return (
    <div className="item-imagen">
      <div className="imagen-wrappers">
        <img src={imagen} alt={nombre} />

        <Link to={url}>
          <button className="btn_primary_themes">{title}</button>
        </Link>
      </div>
      <h6 className="nombre-constructor-card">{nombre}</h6>
    </div>
  );
};
