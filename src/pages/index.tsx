import { Link } from "react-router-dom";

//COMPONENTS
import LandingNavBar from "../components/landig_navbar";
import Banner from "../components/landing_banner";
import Grid from "../components/grid";
import LandingCard from "../components/landing_card";
import CideinContainer from "../components/general_section";
import SmallCard from "../components/small_card";
import CideinFooter from "../components/cidein_footer";

//INFO
import CardsInfo from "../assets/info_json/cards.json";
import CardsCliente from "../assets/info_json/client_options.json";
import CardsContractor from "../assets/info_json/contractor_options.json";
import CardsProvider from "../assets/info_json/provider_options.json";

function Home() {
  return (
    <>
      <LandingNavBar />
      <Banner />

      <Grid columns="3" gap={{ sm: "0", md: "0", lg: "0" }}>
        {CardsInfo.map((cardInfo) => {
          return (
            <LandingCard
              title={cardInfo.title}
              icon={cardInfo.icon}
              description={cardInfo.description}
              theme={cardInfo.theme}
              key={cardInfo.title}
            />
          );
        })}
      </Grid>
      <CideinContainer>
        <h5 className="my_sm_16">
          ¿Eres un <strong>cliente</strong>? - ¿Qué tipo de proyecto quieres
          empezar?
        </h5>
        <Grid columns="6" gap={{ sm: "12", md: "0", lg: "0" }}>
          {CardsCliente.map((cardInfo) => (
            <SmallCard
              title={cardInfo.name}
              icon={cardInfo.icon}
              theme={"secondary_theme"}
              key={cardInfo.name}
            />
          ))}
        </Grid>
      </CideinContainer>
      <CideinContainer>
        <h5 className="my_sm_16">
          ¿Eres un <strong>contratista</strong>? - Descubre las herramientas que
          tenemos para tí.
        </h5>
        <Grid columns="6" gap={{ sm: "12", md: "0", lg: "0" }}>
          {CardsContractor.map((cardInfo) => (
            <SmallCard
              title={cardInfo.name}
              icon={cardInfo.icon}
              theme={"secondary_theme"}
              key={cardInfo.name}
            />
          ))}
        </Grid>
      </CideinContainer>
      <CideinContainer>
        <h5 className="my_sm_16">
          ¿Eres un <strong>Proveedor</strong>? - Publica tus productos y permite
          a toda la comunidad de construímos tener acceso a ellos.
        </h5>
        <Grid columns="6" gap={{ sm: "12", md: "0", lg: "0" }}>
          {CardsProvider.map((cardInfo) => (
            <SmallCard
              title={cardInfo.name}
              icon={cardInfo.icon}
              theme={"secondary_theme"}
              key={cardInfo.name}
            />
          ))}
        </Grid>
      </CideinContainer>
      <CideinFooter />
    </>
  );
}

export default Home;
