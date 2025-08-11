import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

function CideinFooter() {
  return (
    <footer
      className="secondary_theme"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 4rem",
      }}
    >
      <p style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
        Lorem Web Design
      </p>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <FiFacebook style={{ fontSize: "28px" }} />
        <FiTwitter style={{ fontSize: "28px" }} />
        <FaInstagram style={{ fontSize: "28px" }} />
      </div>
    </footer>
  );
}

export default CideinFooter;
