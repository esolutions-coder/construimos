import { useEffect, useRef, useState } from "react";
import { Notification } from "../../components/Notification";

const allNotifications: Notification[] = [
  {
    id: 1,
    text: "Se ha agregado un nuevo comentario",
    read: false,
    time: "Hace 2 horas",
    subtitle: "Se ha agregado un nuevo comentario",
  },
  {
    id: 2,
    text: "Se ha agregado un nuevo comentario",
    read: false,
    time: "Hace 2 horas",
    subtitle: "Se ha agregado un nuevo comentario",
  },
  {
    id: 3,
    text: "Se ha agregado un nuevo comentario",
    read: false,
    time: "Hace 1 hora",
    subtitle: "Se ha agregado un nuevo comentario",
  },
  {
    id: 4,
    text: "Se ha agregado un nuevo comentario",
    read: false,
    time: "Hace 1 hora",
    subtitle: "Se ha agregado un nuevo comentario",
  },
];

export const useClickOut = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return { containerRef, isOpen, setIsOpen, allNotifications };
};
