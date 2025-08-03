import "../types";

function LandingCard({ icon, title, description, theme }: Card) {
  return (
    <div className={`landing_card_body ${theme}`}>
      <div className="landing_card_icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="landing_card_info">
        <div className="landing_card_title">
          <h6>{title}</h6>
        </div>
        <div className="landing_card_text">{description}</div>
      </div>
    </div>
  );
}

export default LandingCard;
