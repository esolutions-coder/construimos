import { useNavigate, useParams } from "react-router-dom";
import Pills from "../../../assets/info_json/pills.json";

type BudgetPillsProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function BudgetPills({setActiveTab}:BudgetPillsProps) {
    const {slug} = useParams();
    const navigate = useNavigate();

    const handlePillClick = (pillSlug: string) => {
      navigate(`/presupuestos/pill/${pillSlug}`)
      setActiveTab(pillSlug);
    }

  return (
    <div className="grid col_sm_2 gap_sm_12 my_sm_16">
      {Pills.map((pill, index) => {
        return (
          <div className={`pill ${slug === pill.slug ? "active" : ""}`} key={index} onClick={()=>handlePillClick(pill.slug)}>
            <span className="material-symbols-outlined">{pill.icon}</span>
            <p>{pill.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetPills;
