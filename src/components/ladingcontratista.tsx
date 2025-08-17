import Contrator from "../assets/img/contractor.png";

function Bannercontratista() {
  return (
    <div className="bannercontratista-container">
      <div className="bannercontratista-content">
        <div className="bannercontratista-text">
          <p className="taglinecontratista">CONTRATISTA</p>
          <h1 className="headlinecontratista">
            Todo lo que un contratista <br /> necesita en un solo lugar
          </h1>
          <p className="subtextcontratista">
            Gestiona tus proyectos, personal y seguridad de manera sencilla con
            nuestras aplicaciones integradas
          </p>
          <button className="btn-registercontratista">Regístrate gratis</button>
        </div>
        <div className="bannercontratista-image">
          <img src={Contrator} alt="contrator" />
        </div>
      </div>
    </div>
  );
}
export default Bannercontratista;
