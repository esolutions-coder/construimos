import imagenc from "../assets/img/imagenc.png";

function Bannerprov() {
  return (
    <div className="bannerprov-container">
      <div className="bannerprov-content">
        <div className="bannerprov-text">
          <p className="tagline">PROVEEDORES</p>
          <h1 className="headline">
            Llega a más constructores <br /> y vende más materiales
          </h1>
          <p className="subtext">
            Registra tu tienda, publica tu inventario y conecta con cientos de
            contratistas listos para comprar
          </p>
          <button className="btn-register">Regístrate gratis</button>
        </div>
        <div className="bannerprov-image">
          <img src={imagenc} alt="Proveedor feliz" />
        </div>
      </div>
    </div>
  );
}
export default Bannerprov;
