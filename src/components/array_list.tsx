import { Notification } from "./Notification";
import cideinLogo from "../assets/img/cidein_logo.png";

const ArrayList = ({
  notifications,
  onClickNotification,
}: {
  notifications: Notification[];
  onClickNotification: (notification: Notification) => void;
}) => {
  return (
    <div className="notif-list">
      {notifications.length > 0 ? (
        notifications.map((n: Notification) => (
          <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`} onClick={() => onClickNotification(n)}>
            <p className="notif-text">
              {n.text}
              <img src={cideinLogo} alt="cideinLogo" className="notif-logo" />
            </p>
            <span className="notif-time">{n.time}</span>

            {!n.read && <span className="unread-dot"></span>}
          </div>
        ))
      ) : (
        <div className="notif-empty">No hay notificaciones</div>
      )}
    </div>
  );
};

export default ArrayList;
