import { Notification } from "./Notification";
import equipop from "../assets/img/equipop.png";

const ModalNotifications = ({ selectedNotification }: { selectedNotification: Notification | null }) => {
  if (!selectedNotification) return null;

  return (
    <div className="modal-notification">
      <div className="meta">
        <span>{selectedNotification.time}</span>
        <h1>{selectedNotification.text}</h1>
      </div>

      <h1>{selectedNotification.subtitle}</h1>
      <p>
        Megaobras en marcha: Se han identificado 4 megaproyectos clave para este año que buscan transformar la conectividad y movilidad del
        país. Entre ellos, el Metro de Bogotá entra en una etapa crítica: se espera que los primeros trenes inicien pruebas de operación en
        junio de 2026. Entre ellos, el Metro de Bogotá entra en una etapa crítica: se espera que los primeros trenes inicien pruebas de
        operación en junio de 2026.
      </p>
      <img src={equipop} alt="cideinLogo" className="logo-modal" />
    </div>
  );
};

export default ModalNotifications;
