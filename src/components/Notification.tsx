import { useClickOut } from "../customHooks/auth/useClickOut";
import { useLocalStorage } from "../customHooks/auth/useLocalStorage";
import Modal from "./layout/modal";
import { useState } from "react";
import ArrayList from "./array_list";
import ModalNotifications from "./modal_notifications";

export type Notification = {
  id: number;
  text: string;
  read: boolean;
  time: string;
  subtitle: string;
};

type Subtitle = { subtitle: string };

const NotificationCenter = ({ subtitle }: Subtitle) => {
  const { containerRef, isOpen, setIsOpen, allNotifications } = useClickOut();
  const [notifications, setNotifications] = useLocalStorage("notifications", allNotifications);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(notifications.map((n: Notification) => (n.id === notification.id ? { ...n, read: true } : n)));
    setSelectedNotification(notification);
    setNotificationModal(true);
    setIsOpen(false);
  };

  const allReadButton = () => {
    setNotifications(notifications.map((n: Notification) => ({ ...n, read: true })));
  };

  return (
    <div className="notif-container" ref={containerRef}>
      <button className="notif-bell-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="material-symbols-outlined" style={{ color: "#fdbe33" }}>
          notifications
        </span>
        <p className="notif-subtitle">{subtitle}</p>
        {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <h3>Notificaciones</h3>
            <button className="notif-mark-all" onClick={allReadButton}>
              Marcar todo como leído
            </button>
          </div>
          <ArrayList notifications={notifications} onClickNotification={handleNotificationClick} />
          <div className="notif-footer">Ver todas las notificaciones</div>
        </div>
      )}
      <Modal modal={notificationModal} setModal={setNotificationModal}>
        <ModalNotifications selectedNotification={selectedNotification} />
      </Modal>
    </div>
  );
};

export default NotificationCenter;
