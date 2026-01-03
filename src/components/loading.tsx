import cidein_logo_yellow from "../assets/img/cidein_logo_yellow.png";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <img src={cidein_logo_yellow} alt="logo" className="loading__logo" />
      </div>
    </div>
  );
}
