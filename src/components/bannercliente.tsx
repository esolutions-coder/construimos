import "../assets/styles/_bannerclient.scss";
import cliente from "../assets/img/cliente.png";

function Bannercliente() {
  return (
    <div className="bannerclient-container">
      <div className="bannerclient-content">
        <div className="bannerclient-text">
          <p className="taglineclient">CLIENTES</p>
          <h1 className="headlineclient">
            Todo lo que necesitas, <br />
            en un solo lugar
          </h1>
          <p className="subtextclientx">
            En nuestra plataforma, los clientes tienen acceso inmediato a
            herramientas y recursos para hacer realidad sus proyectos
          </p>
          <button className="btn-registerclient">Regístrate gratis</button>
        </div>
        <div className="bannerclient">
          <img src={cliente} alt="client" className="clind" />
        </div>
      </div>
    </div>
  );
}
export default Bannercliente;
