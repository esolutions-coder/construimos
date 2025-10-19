type Toast = {
    theme: string;
    title: string;
    body: string
    footer?: string
    isActive: boolean
    setToast: React.Dispatch<React.SetStateAction<boolean>>

}
export default function Toast({theme, title, body, footer, isActive, setToast}: Toast){
    return (
        <div className={`toastContainer ${theme} ${isActive ? 'show' : ''}` }>
            <div className="toastHeaderContainer">
            <div className="toastHeader">
               <p>{title}</p>
            </div>
            <div className="close" onClick={()=>{setToast(false)}}>
                <span>X</span>
            </div>
            </div>
            <div className="toastBody">
                {body}
            </div>
            <div className={`toastFooter ${footer ? '':'hide'}`}>
                {footer}
            </div>
        </div>
    )
}