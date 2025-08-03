import showRoomImage from "../assets/img/image.png";

interface ShowRoomProps {
  title: string;
  contractor: string;
}

function ShowRoomItem({ title, contractor }: ShowRoomProps) {
  return (
    <div className="showroom_item_container span_sm_2">
      <div className="showroom_item_image">
        <img src={showRoomImage} alt="" />
      </div>
      <div className="showroom_item_info">
        <div className="showroom_title_container">
          <div className="showroom_date_container">
            <p>JUN</p>
            <p>27</p>
          </div>
          <div className="showroom_title">
            <p>{title}</p>
            <p>Miércoles 27/07/2022 10:00 am</p>
          </div>
        </div>
        <div className="showroom_description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio rerum
            hic molestiae saepe impedit corporis iste facere eos sit est quia
            harum, voluptas et molestias dolore eius odit minus explicabo!
          </p>
        </div>
        <div className="showroom_calification">
          <p>Calificacion</p>
          <ul className="start_rating">
            <li>
              <span className="material-symbols-outlined">star</span>
            </li>
            <li>
              <span className="material-symbols-outlined">star</span>
            </li>
            <li>
              <span className="material-symbols-outlined">star</span>
            </li>
            <li>
              <span className="material-symbols-outlined">star</span>
            </li>
            <li>
              <span className="material-symbols-outlined">star</span>
            </li>
          </ul>
        </div>
        <div className="showroom_contractor">
          <p>Contratista: {contractor}</p>
        </div>

        <div className="showroom_action">
          <button className="btn primary_theme">Ver proyecto</button>
        </div>
      </div>
    </div>
  );
}

export default ShowRoomItem;
