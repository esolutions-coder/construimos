import enterprise from "../assets/img/empresa.jpg";

function ShowRoomStars() {
  return (
    <div className="showroom_stars_container">
      <div className="showroom_starts_image">
        <img src={enterprise} alt="" />
      </div>
      <div className="showroom_stars_text ">
        <h6 className="showroom_stars_title">ECONSTRUIMOS 1A SAS</h6>
        <p className="showroom_stars_content txt_left">
          Especialistas en remodelaciones de interiores
        </p>
      </div>
    </div>
  );
}
export default ShowRoomStars;
