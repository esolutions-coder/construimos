//IMAGES
import BannerImage from "../assets/img/banner_1.png";
function Banner() {
  return (
    <div id="banner">
      <img src={BannerImage} alt="" />
      <div id="over_banner_info">
        <h4 className="txt_white">Soy un cliente</h4>
        <p className="txt_white">
          Los clientes son las personas que quieren desarrollar un proyecto y
          necesitan de profesionales para llevarlos a cabo
        </p>
        <button className="btn primary_theme">Registrarme como cliente</button>
      </div>
    </div>
  );
}

export default Banner;
