import cideinLogo from "../assets/img/cidein_logo.png";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <img src={cideinLogo} alt="Cidein Logo" className="loading__logo" />
      </div>
    </div>
  );
}
