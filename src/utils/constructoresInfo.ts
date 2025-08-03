import alberto from "../assets/img/alberto.png";
import luis from "../assets/img/luis.png";
import carlos from "../assets/img/carlos.png";
import gareth from "../assets/img/gareth.png";
import davies from "../assets/img/davies.png";

interface InfoConstructor {
  nombre: string;
  especialidad: string;
  ubicacion: string;
  experiencia: string;
  contacto: string;
  imagen: string;
}

export const CONSTRUCTORES: InfoConstructor[] = [
  {
    nombre: "Alberto Jimenez",
    especialidad: "Diseño estructural",
    ubicacion: "Medellín, Colombia",
    experiencia: "9 años en proyectos urbanos y sostenibles",
    contacto: "albertojimenez@email.com",
    imagen: alberto,
  },
  {
    nombre: "Luis Diaz",
    especialidad: "Reformas residenciales",
    ubicacion: "Cali, Colombia",
    experiencia: "12 años en remodelación de viviendas",
    contacto: "luchodiaz@email.com",
    imagen: luis,
  },
  {
    nombre: "Gareth Bale",
    especialidad: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: "10 años en obras civiles y remodelaciones",
    contacto: "garethb@email.com",
    imagen: gareth,
  },
  {
    nombre: "Juan Carlos",
    especialidad: "Reformas residenciales",
    ubicacion: "Cali, Colombia",
    experiencia: "12 años en remodelación de viviendas",
    contacto: "carlitos@email.com",
    imagen: carlos,
  },
  {
    nombre: "Davies Fernandez",
    especialidad: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: "10 años en obras civiles y remodelaciones",
    contacto: "daviesf@email.com",
    imagen: davies,
  },
];
