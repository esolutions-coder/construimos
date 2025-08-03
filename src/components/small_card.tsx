function SmallCard({ icon, title, theme }: SmallCard) {
  return (
    <div className={`smallCard_body ${theme}`}>
      <div className="smallCard_icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="smallCard_title">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default SmallCard;
