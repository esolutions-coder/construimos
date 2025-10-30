import miguel from "../assets/img/miguel.png";
import camila from "../assets/img/camila.png";
import carlos from "../assets/img/carlos.png";
import rafael from "../assets/img/rafael.png";
import angelyn from "../assets/img/angelyn.png";

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
    nombre: "Miguel Tapia",
    especialidad: "Diseño estructural",
    ubicacion: "Sevilla, Esapaña",
    experiencia: "5 años en proyectos urbanos y sostenibles",
    contacto: "loremdisenoweb@gmail.com",
    imagen: miguel,
  },
  {
    nombre: "Camila Lopez",
    especialidad: "Reformas residenciales",
    ubicacion: "Cali, Colombia",
    experiencia: "8 años en remodelación de viviendas",
    contacto: "camilopez@gmail.com",
    imagen: camila,
  },
  {
    nombre: "Rafael Zambrano",
    especialidad: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: "10 años en obras civiles y remodelaciones",
    contacto: "rafaelzambr@gmail.com",
    imagen: rafael,
  },
  {
    nombre: "Juan Carlos",
    especialidad: "Reformas residenciales",
    ubicacion: "Cali, Colombia",
    experiencia: "12 años en remodelación de viviendas",
    contacto: "carlitos@gmail.com",
    imagen: carlos,
  },
  {
    nombre: "Angelyn alameda",
    especialidad: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: "10 años en obras civiles y remodelaciones",
    contacto: "angelynalameda@gmail.com",
    imagen: angelyn,
  },
];
