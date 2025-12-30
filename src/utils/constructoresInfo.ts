import miguel from "../assets/img/miguel.png";
import camila from "../assets/img/camila.png";
import carlos from "../assets/img/carlos.png";
import rafael from "../assets/img/rafael.png";
import angelyn from "../assets/img/angelyn.png";

interface InfoConstructor {
  nombre: string;
  descripcion: string;
  ubicacion: string;
  experiencia: Array<string>;
  obras: Array<string>;
  imagen: string;
}

export const CONSTRUCTORES: InfoConstructor[] = [
  {
    nombre: "Miguel Tapia",
    descripcion:
      " Lorem ipsum rafael Lorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafael",
    ubicacion: "Sevilla, España",
    experiencia: [
      "8 años en remodelación de viviendas",
      "10 años en obras civiles y remodelaciones",
      "12 años en obras civiles y remodelaciones",
      "14 años en obras civiles y remodelaciones",
    ],
    obras: [
      "Reformas residenciales",
      "Construcción general",
      "Construcción general",
      "Construcción de viviendas",
    ],
    imagen: miguel,
  },
  {
    nombre: "Camila Lopez",
    descripcion:
      "Lorem ipsum rafael Lorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafaelLorem ipsum rafael",
    ubicacion: "Cali, Colombia",
    experiencia: [
      "8 años en remodelación de viviendas",
      "10 años en obras civiles y remodelaciones",
      "12 años en obras civiles y remodelaciones",
      "14 años en obras civiles y remodelaciones",
    ],
    obras: [
      "Reformas residenciales",
      "Construcción general",
      "Construcción general",
      "Construcción de viviendas",
    ],
    imagen: camila,
  },
  {
    nombre: "Rafael Zambrano",
    descripcion: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: [
      "8 años en remodelación de viviendas",
      "10 años en obras civiles y remodelaciones",
      "12 años en obras civiles y remodelaciones",
      "14 años en obras civiles y remodelaciones",
    ],
    obras: [
      "Reformas residenciales",
      "Construcción general",
      "Construcción general",
      "Construcción de viviendas",
    ],
    imagen: rafael,
  },
  {
    nombre: "Juan Carlos",
    descripcion: "Reformas residenciales",
    ubicacion: "Cali, Colombia",
    experiencia: [
      "8 años en remodelación de viviendas",
      "10 años en obras civiles y remodelaciones",
      "12 años en obras civiles y remodelaciones",
      "14 años en obras civiles y remodelaciones",
    ],
    obras: [
      "Reformas residenciales",
      "Construcción general",
      "Construcción general",
      "Construcción de viviendas",
    ],
    imagen: carlos,
  },
  {
    nombre: "Angelyn alameda",
    descripcion: "Construcción general",
    ubicacion: "Bogotá, Colombia",
    experiencia: [
      "8 años en remodelación de viviendas",
      "10 años en obras civiles y remodelaciones",
      "12 años en obras civiles y remodelaciones",
      "14 años en obras civiles y remodelaciones",
    ],
    obras: [
      "Reformas residenciales",
      "Construcción general",
      "Construcción general",
      "Construcción de viviendas",
    ],
    imagen: angelyn,
  },
];
