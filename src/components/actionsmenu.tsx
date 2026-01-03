import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import settingsun from "../assets/img/settingsun.png";

type Action = "edit" | "delete";

export default function ActionsMenu({
  itemId,
  deletingProject = false,
  onRowAction,
  helpfulAlert,
}: {
  itemId: string;
  deletingProject?: boolean;
  onRowAction: (action: Action, id: string) => void;
  helpfulAlert: (
    msg: string,
    theme: string,
    seconds: number,
    icon: string
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const placeMenu = () => {
    const b = btnRef.current?.getBoundingClientRect();
    if (!b) return;
    const spacing = 6;
    const top = b.bottom + spacing;
    const left = Math.min(Math.max(8, b.right - 180), window.innerWidth - 188);
    setPos({ top, left, width: b.width });
  };

  useLayoutEffect(() => {
    if (!open) return;
    placeMenu();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => placeMenu();
    const onDocClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const handleAction = async (action: Action) => {
    await onRowAction(action, itemId);
    if (action === "delete") {
      helpfulAlert(
        "Presupuesto eliminado correctamente",
        "success_theme",
        5,
        "check_circle"
      );
    }
    setOpen(false);
    requestAnimationFrame(() => btnRef.current?.focus());
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Acciones del presupuesto"
        title="Acciones"
        disabled={deletingProject}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={{
          padding: "6px 8px",
          borderRadius: 8,
          border: "none",
          background: "#fff",
          cursor: deletingProject ? "not-allowed" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 1,
        }}
      >
        <span aria-hidden="true">
          <img src={settingsun} alt="" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Acciones del presupuesto"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              minWidth: 180,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              boxShadow: "0 12px 28px rgba(0,0,0,.15)",
              padding: 6,
              zIndex: 10000,
            }}
          >
            <MenuItem
              reactIcon={
                <span className="menu-item-icon">
                  <span className="material-symbols-outlined">edit</span>
                  <span
                    className="menu-item-text"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-1.5rem",
                    }}
                  >
                    Editar
                  </span>
                </span>
              }
              onClick={() => handleAction("edit")}
            />

            <MenuItem
              reactIcon={
                <span className="menu-item-icon">
                  <span className="material-symbols-outlined">delete</span>
                  <span
                    className="menu-item-text"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-1.5rem",
                    }}
                  >
                    Eliminar
                  </span>
                </span>
              }
              onClick={() => handleAction("delete")}
            />
          </div>,
          document.body
        )}
    </>
  );
}

function MenuItem({
  reactIcon,
  onClick,
  danger = false,
}: {
  reactIcon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      data-menuitem
      role="menuitem"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: 6,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 14,
        color: danger ? "#b91c1c" : "#111827",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {reactIcon}
    </button>
  );
}
