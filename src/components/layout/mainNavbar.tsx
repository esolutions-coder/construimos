export default function MainNavbar() {
  return (
    <div className="primaryNavbar">
      <ul>
        <li>
          <a href="">
            <span className="material-symbols-outlined">home</span>
            <p className="label">Inicio</p>
          </a>
        </li>
        <li>
          <a href="">
            <span className="material-symbols-outlined">add</span>
            <p className="label">Añadir proyecto</p>
          </a>
        </li>
        <li>
          <a href="">
            <span className="material-symbols-outlined">notifications</span>
            <p className="label">Notificaciones</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
