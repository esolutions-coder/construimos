import imagenc from "../assets/img/imagenc.png";
import useTypewriter from "./useTypewriter";
import "../assets/styles/_bannerprov.scss";

function Bannerprov() {
  const text = useTypewriter(
    "LLlega a más constructores\ny vende más materiales",
    40
  );

  return (
    <div className="bannerprov-container">
      <div className="bannerprov-content">
        <div className="bannerprov-text">
          <p className="tagline">PROVEEDORES</p>
          <h1 className="headline">
            {text.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="subtext">
            Registra tu tienda, publica tu inventario y conecta con cientos de
            contratistas listos para comprar
          </p>
          <button className="btn-register">Regístrate gratis</button>
        </div>
        <img src={imagenc} alt="Proveedor feliz" className="confelizd" />
      </div>
    </div>
  );
}

export default Bannerprov;
