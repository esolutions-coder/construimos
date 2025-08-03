import { jsx as _jsx } from "react/jsx-runtime";
function Grid({ children, columns, gap }) {
    return (_jsx("div", Object.assign({ className: `grid col_${columns} gap_sm_${gap.sm} gap_md_${gap.md} gap_lg_${gap.lg}` }, { children: children })));
}
export default Grid;
