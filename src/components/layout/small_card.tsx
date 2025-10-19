import { Link } from "react-router-dom";

function SmallCard({ icon, title, theme, url }: SmallCard) {
  return (
    <Link className={`smallCard_body ${theme}`} to={url}>
      <div className="smallCard_icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="smallCard_title">
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default SmallCard;
