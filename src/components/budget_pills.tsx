type PillsProps = {
  name: string;
  icon: string;
};

function BudgetPills({ name, icon }: PillsProps) {
  return (
    <div className="pill">
      <span className="material-symbols-outlined">{icon}</span>
      <p>{name}</p>
    </div>
  );
}

export default BudgetPills;
