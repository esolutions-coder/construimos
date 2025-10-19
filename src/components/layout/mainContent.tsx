import { PropsWithChildren } from "react";
import Grid from "./grid";
import MainNavbar from "./mainNavbar";

export default function MainContent({children}:PropsWithChildren){
    <Grid def={3} gap={12} lg={2} md={2} sm={2}>
        <MainNavbar/>
        {children}
    </Grid>
}