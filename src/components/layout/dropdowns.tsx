import { useState } from "react";

type Dropdown = {
    title: string
    options: 
        {
            title: string,
            action: Function
        }[]
    
}
export default function Dropdowns({title, options}:Dropdown){
    const [dropdown, setDropdown] = useState(false);
    return(
        <li className="dropdown secondary_hover_theme" onClick={()=>setDropdown(!dropdown)}>
                    <div className="dropName">{title}</div>
                    <ul className={`${dropdown ? "show" : ""} dropdown-content cleanLists`}>
                        {options.map((option, index)=>{
                            return(
                                <li key={Math.random()} className="contrast_hover_theme" onClick={()=>{option.action()}}>{option.title}</li>
                            )
                        })}
                    </ul>
                </li>
    )
}