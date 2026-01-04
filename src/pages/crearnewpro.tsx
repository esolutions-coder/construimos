import "../assets/styles/_crearnewpro.scss";
import CideinLayoutProvedor from "../components/cidein_layout_provedor";

function CrearPro() {
  return (
    <CideinLayoutProvedor>
      <div className="dashboard-detailsone">
        <div className="left-panel">
          <h1 className="añadirnewmat">AÑADIR NUEVO MATERIAL</h1>

          <input placeholder="Nombre del material" className="inputnombre" />
          <textarea placeholder="Descripción larga" className="textareass" />

          <div className="infoazul">
            <h1 className="infopro">INFORMACIÓN DEL PRODUCTO</h1>
          </div>

          <div className="tabs">
            <div className="flexcolumn">
              <div className="tab active">GENERAL</div>
              <div className="tab">INVENTARIO</div>
              <div className="tab">FICHA TÉCNICA</div>
            </div>
            <div className="inputsflexs">
              {" "}
              <input placeholder="$ Precio normal" className="precioinput" />
              <input
                placeholder="$ Precio con rebaja"
                className="precioinput"
              />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="right-panel">
          <div className="card">
            <div className="apartadoazul">IMAGEN DEL PRODUCTO</div>
            <input type="file" className="upload-box" id="file-upload" />
          </div>

          <div className="card">
            <div className="apartadoazul">GALERÍA DEL PRODUCTO</div>{" "}
            <input
              type="file"
              className="upload-box small"
              id="upload-gallery"
            />
            <div className="card">
              <button className="save-btn">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </CideinLayoutProvedor>
  );
}

export default CrearPro;
