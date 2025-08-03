type GridSettings = {
  children: React.ReactNode;
  columns: string;
  gap: { sm: string; md: string; lg: string };
};

function Grid({ children, columns, gap }: GridSettings) {
  return (
    <div
      className={`grid col_${columns} gap_sm_${gap.sm} gap_md_${gap.md} gap_lg_${gap.lg}`}
    >
      {children}
    </div>
  );
}

export default Grid;
