import { useState } from "react";

type Card = {
    name: string;
    icon: string;
    action: Function;
    auxiliarAction: Function
    list: string[]
  };
  
  export default function AccordeonCard({ name, icon, action, list, auxiliarAction }: Card) {
    const [showBody, setShowBody] = useState(true)
    return (
      <div className={`accordeonCard `} onClick={()=>{action()}}>
        <div className="front">
        <div className={`name ${name ? "" : "txtRed"}`}>
        {name ? name:"Nombre no asignado"}
        </div>
        <div className="options flex">
          
            <div className="flexCentered" onClick={()=>setShowBody(!showBody)}>
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="flexCentered" onClick={()=>auxiliarAction()}>
              <span className="material-symbols-outlined">delete</span>
            </div>
          
        </div>
        </div>
        <div className={`body ${showBody ? "active":""}`}>
          <ul>
            {list.map((item, index)=><li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    );
  }