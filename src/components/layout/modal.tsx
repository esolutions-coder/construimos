//React Imports
import { PropsWithChildren, useEffect, useRef, useState } from "react";
//Estilos
import "../../assets/styles/_modal.scss"
//Images
import CONST_LOGO from "../../assets/img/cidein_logo.png";


type Modal = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ children, modal, setModal }: PropsWithChildren<Modal>) {
    const modalRef = useRef<HTMLDivElement>(null);
    
  return (
    <div className={`modalContainer ${modal ? '' : 'hide'}`}>
      <div className="modalBody" ref={modalRef}>
        <div className="modalHeader">
          <div className="modalIcon">
            <img src={CONST_LOGO} alt="Circulo de ingenieros" />
          </div>
          <div className="closeModal" onClick={()=>setModal(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
        </div>
        </div>
        <div className="modalContent">
        {children}
        </div>
      </div>
    </div>
  );
}
