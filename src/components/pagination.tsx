import React, { useState } from "react";

const Pagination = () => {
  const [active, setActive] = useState(1);

  const pages = [1, 2, 3];

  const handlePrev = () => {
    if (active > 1) setActive(active - 1);
  };

  const handleNext = () => {
    if (active < pages.length) setActive(active + 1);
  };

  return (
    <div style={styles.container}>
      <button style={styles.arrow} onClick={handlePrev}>
        ❮
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setActive(page)}
          style={{
            ...styles.page,
            ...(active === page ? styles.activePage : {}),
          }}
        >
          {page}
        </button>
      ))}

      <button style={styles.arrow} onClick={handleNext}>
        ❯
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  arrow: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#1a093f",
    cursor: "pointer",
  },
  page: {
    width: "50px",
    height: "50px",
    border: "2px solid #000",
    backgroundColor: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  activePage: {
    backgroundColor: "#fbbf24", // Amarillo
    border: "none",
    fontWeight: "bold",
  },
};

export default Pagination;
