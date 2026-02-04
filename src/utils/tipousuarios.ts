export type NavItem = { label: string; to: string };

export const NAV_ITEMS_BY_ROLE: Record<
  "ADMIN" | "VISITOR" | "CONTRATISTA" | "PROVIDER" | "SOPORTE",
  NavItem[]
> = {
  ADMIN: [
    { label: "Inicio", to: "/" },
    { label: "Clientes", to: "/cliente" },
    { label: "Presupuestos", to: "/presupuestos/pill/:slug" },
    { label: "Proveedores", to: "/proveedores" },
    { label: "Contratistas", to: "/contratista" },
    { label: "Constructores", to: "/showroom" },
  ],
  VISITOR: [
    { label: "Inicio", to: "/" },
    { label: "Clientes", to: "/cliente" },
    { label: "Proveedores", to: "/proveedores" },
    { label: "Contratistas", to: "/contratista" },
  ],
  CONTRATISTA: [
    { label: "Inicio", to: "/" },
    { label: "Contratista", to: "/contratista" },
    { label: "Presupuestos", to: "/presupuestos" },
    { label: "Proveedores", to: "/proveedores" },
  ],
  PROVIDER: [],
  SOPORTE: [
    { label: "Inicio", to: "/" },
    { label: "Tickets", to: "/soporte" },
    { label: "Clientes", to: "/cliente" },
  ],
};
