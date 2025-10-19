import "../assets/styles/_crearnewpro.scss";
import Sidebar from "../components/layout/sidebar";

function CrearPro() {
  return (
    <div className="dashboard-details">
      <Sidebar />
      <h1 className="añadirnewmat">AÑADIR NUEVO MATERIAL</h1>
      <textarea placeholder="Nombre del material" className="inputnombre" />
      <textarea placeholder="Descripción larga" className="textarea " />
      <div className="infoazul">
        <h1 className="infopro">INFORMACIÓN DEL PRODUCTO</h1>
      </div>
      <div className="general">
        <h1 className="minitixs">GENERAL</h1>
      </div>
      <div className="inventarios">
        <h1 className="minitixs">INVENTARIO</h1>
      </div>
      <div className="fichatecnica">
        <h1 className="minitixs">FICHA TÉCNICA</h1>
      </div>
      <div>
        <textarea placeholder="$ Precio normal" className="precioinputuno" />
        <textarea
          placeholder="$ Precio con rebaja"
          className="precioinputdos"
        />
      </div>
      <div className="guardarproducto">
        <div className="apartadoazul">
          <h1 className="inf">GUARDAR PRODUCTO</h1>
        </div>
      </div>
      <div className="imagendelproducto">
        <div className="apartadoazul">
          <h1 className="inf">IMAGEN DEL PRODUCTO</h1>
        </div>
      </div>
      <div className="productodos">
        <div className="apartadoazul">
          <h1 className="inf">GALERIA DEL PRODUCTO</h1>
        </div>
      </div>
    </div>
  );
}

export default CrearPro;
