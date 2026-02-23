import { useBudgetContext } from "../context/budgetContext";
import useContextMenu from "../hooks/useContextMenu";

type ContextMenuProps = {
  subActivity: SubActivities | null;
  activity: ProjecActivities | null;
  clicked: boolean;
  points: { x: number; y: number };
};
export default function ContextMenu({ subActivity, activity, clicked, points }: ContextMenuProps) {
  const {
    setActiveTab,
    setSelectedApu,
    getFullApu,
    GetFullApuResponse,
    setApuCreatorFlag,
    setApuInfo,
    currentProject,
    setProjectInfo,
    helpfulAlert
  } = useBudgetContext();

  const setTabAndShowAPU = (flag: string, apuInfo: APU) => {
    setActiveTab("local_apu_viewer");
    setSelectedApu(apuInfo);
  };

  const deleteSubActivity = (activityId: string, subActivityId: string) => {
    const removeSubActivity = currentProject.deleteSubActivity(activityId, subActivityId);

    setProjectInfo(currentProject.state);

    helpfulAlert(`Has eliminado la sub actividad: ${removeSubActivity[0].subActivity_apu.apu_name}`, "primary_theme", 3, "info");
  };

  return (
    <div style={{ position: "absolute", top: points.y, left: points.x, display: clicked ? "block" : "none" }} className="context_menu">
      <ul>
        <li
          onClick={() => {
            if (subActivity) {
              setTabAndShowAPU(subActivity.flag, subActivity.subActivity_apu);
              setApuCreatorFlag(false);
              setApuInfo(subActivity.subActivity_apu);
              
            }
          }}
        >
          Ver APU
        </li>
        <li>Ver Memorias</li>
        <li>Añadir Memorias</li>
        <li
          onClick={() => {
            if (subActivity && activity) deleteSubActivity(activity.activity_id, subActivity.subActivity_id);
          }}
        >
          Eliminar
        </li>
      </ul>
    </div>
  );
}
