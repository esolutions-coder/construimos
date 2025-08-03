import Formatter from "../utils/formatter";

interface ApuCard {
  apuInfo: APU;
  addSubActivity: Function;
  setTab: React.Dispatch<React.SetStateAction<boolean>>;
  visualizeExternalAPU: Function;
}

function ApuCard({
  apuInfo,
  addSubActivity,
  setTab,
  visualizeExternalAPU,
}: ApuCard) {
  const setTabAndShowAPU = () => {
    setTab(false);
    visualizeExternalAPU(apuInfo._id);
  };
  return (
    <div className="apu_card">
      <div className="apu_card_body">
        <p className="apu_card_title">{apuInfo.apu_name}</p>
        <p className="apu_card_description">{apuInfo.apu_description}</p>
        <p className="apu_card_description">
          Costo: {Formatter(apuInfo.apu_price)}
        </p>
      </div>
      <div className="apu_card_actions">
        <span
          className="material-symbols-outlined"
          onClick={() => setTabAndShowAPU()}
        >
          visibility
        </span>
        <span
          className="material-symbols-outlined"
          onClick={() => addSubActivity(apuInfo._id)}
        >
          add_box
        </span>
      </div>
    </div>
  );
}

export default ApuCard;
