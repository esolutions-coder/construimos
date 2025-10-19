import { PropsWithChildren } from "react";

type Grid = {
    sm: number;
    md: number;
    lg: number;
    gap: number;
    def: number;
    className?: string;
  };

export default function Grid({children, sm, md, lg, gap, def, className}: PropsWithChildren<Grid>){
    return(
        <div className={`grid col_def_${def} col_sm_${sm}  col_md_${md}  col_lg_${lg} ${className}`} style={{gap: gap}}>
            {children}
        </div>
    )
}