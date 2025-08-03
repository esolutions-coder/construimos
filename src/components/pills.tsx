type PillsProps = {
  name: string;
  icon: string;
  pillState: boolean;
  setPillsState: React.Dispatch<React.SetStateAction<boolean[]>>;
  pillIndex: number;
};

function Pill({ name, icon, pillState, pillIndex, setPillsState }: PillsProps) {
  const activatePill = () => {
    let allPillsState = [false, false, false, false, false];
    allPillsState[pillIndex] = !allPillsState[pillIndex];
    setPillsState(allPillsState);
  };
  return (
    <div className={`pill ${pillState ? "active" : ""}`} onClick={activatePill}>
      <span className="material-symbols-outlined">{icon}</span>
      <p>{name}</p>
    </div>
  );
}

export default Pill;
