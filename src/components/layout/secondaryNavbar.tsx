import userImage from "../../assets/img/user_image.png";

export default function SecondaryNavbar(){
    return(
      <div className="secondaryNavbar">
      <div className="user_options_navbar">
        <img src={userImage} alt="" />
        <p className="caption txt_primary">MIGUEL TAPIA</p>
      </div>
    </div>
    )
}