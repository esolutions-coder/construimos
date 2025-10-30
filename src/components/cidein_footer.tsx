import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";

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
        <FaInstagram
          style={{ fontSize: "28px", cursor: "pointer" }}
          onClick={() =>
            (window.location.href = "https://www.instagram.com/loremwebs/")
          }
          target="_blank"
          rel="noopener noreferrer"
        />
        <FiFacebook
          style={{ fontSize: "28px", cursor: "pointer" }}
          onClick={() =>
            (window.location.href = "https://www.facebook.com/loremwebs")
          }
          target="_blank"
          rel="noopener noreferrer"
        />
        <RiTiktokLine
          style={{ fontSize: "28px", cursor: "pointer" }}
          onClick={() =>
            (window.location.href = "https://www.tiktok.com/@loremwebdesign")
          }
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </footer>
  );
}

export default CideinFooter;
