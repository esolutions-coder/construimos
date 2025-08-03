type WarningProps = {
  state: boolean;
  message: string;
  color: string;
  icon: string;
  setWarningProps: React.Dispatch<
    React.SetStateAction<{
      warningState: boolean;
      message: string;
      color: string;
      icon: string;
    }>
  >;
};

function CideinWarning({
  state,
  message,
  setWarningProps,
  color,
  icon,
}: WarningProps) {
  if (state) {
    return (
      <div className={`warning ${color}`}>
        <div className="warning_info">
          <div className="warning_icon">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <div className="warning_message">{message}</div>
        </div>
        <div className="warning_option">
          <span
            className="material-symbols-outlined"
            onClick={() =>
              setWarningProps({
                warningState: false,
                message: "Sin mensaje",
                color: "primary_theme",
                icon: "info",
              })
            }
          >
            close
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CideinWarning;
