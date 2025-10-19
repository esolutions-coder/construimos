import { useState } from "react";

type Element = {
  file: string,
  x: string,
  y: string,
  title: string
  checks: string[]
}

type MachineImageContainer = {
  element: Element
  selectElement: React.Dispatch<React.SetStateAction<Element>>;
};
export default function MachineImageContainer({ element, selectElement }: MachineImageContainer) {
  const [color, setColor] = useState(false);
  return (
    <div className="machine">
      <div
        className="seeMore"
        style={{ top: element.y, right: element.x }}
        onClick={() => {
          setColor(!color);
          selectElement(element);
        }}
      >
        <span className="material-symbols-outlined">radio_button_checked</span>
      </div>
      <img src={`images/mini/${element.file}`} alt="" className={`hola ${color ? "colorful" : ""}`} />
    </div>
  );
}
