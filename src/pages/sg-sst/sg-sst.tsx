import CideinLayout from "../../components/cidein_layout";
import Grid from "../../components/layout/grid";
import MainNavbar from "../../components/layout/mainNavbar";
import SmallCard from "../../components/layout/small_card";

export default function SG_SST() {
  return (
    <CideinLayout>
      <Grid gap={12} sm={1} md={1} lg={1} def={1} className="col_lg_sp_12 my_12 mr_12">
        <MainNavbar />
        <div className="col_s8" style={{ height: "100vh" }}>
          <Grid gap={12} sm={8} md={8} lg={8} def={1} className="col_lg_sp_12 my_12 mr_12">
            <SmallCard icon="description" theme="primary_theme" title="ATS" url="ats/editor"/>
            <SmallCard icon="manufacturing" theme="primary_theme" title="PREOPERACIONAL" url="preoperacional/creator"/>
          </Grid>
        </div>
      </Grid>
    </CideinLayout>
  );
}
