import { CloseIcon } from "./Icons";

export default function SizeGuide({ category, onClose }) {
  const sizeCharts = {
    tops: {
      title: "Tops Size Guide",
      headers: ["Size", "Chest (cm)", "Length (cm)", "Shoulder (cm)"],
      rows: [
        ["S", "96-100", "68", "44"],
        ["M", "100-104", "70", "46"],
        ["L", "104-108", "72", "48"],
        ["XL", "108-112", "74", "50"],
        ["XXL", "112-116", "76", "52"],
      ],
    },
    bottoms: {
      title: "Bottoms Size Guide",
      headers: ["Size", "Waist (cm)", "Hip (cm)", "Length (cm)"],
      rows: [
        ["28", "71-74", "91-94", "100"],
        ["30", "76-79", "96-99", "102"],
        ["32", "81-84", "101-104", "104"],
        ["34", "86-89", "106-109", "106"],
        ["36", "91-94", "111-114", "108"],
      ],
    },
    footwear: {
      title: "Footwear Size Guide",
      headers: ["Size (EU)", "Size (US)", "Size (UK)", "Length (cm)"],
      rows: [
        ["39", "6.5", "6", "25"],
        ["40", "7", "6.5", "25.5"],
        ["41", "8", "7", "26"],
        ["42", "8.5", "8", "26.5"],
        ["43", "9.5", "9", "27"],
        ["44", "10", "9.5", "27.5"],
      ],
    },
    outerwear: {
      title: "Outerwear Size Guide",
      headers: ["Size", "Chest (cm)", "Length (cm)", "Sleeve (cm)"],
      rows: [
        ["S", "98-102", "65", "60"],
        ["M", "102-106", "67", "62"],
        ["L", "106-110", "69", "64"],
        ["XL", "110-114", "71", "66"],
      ],
    },
  };

  const chart = sizeCharts[category] || sizeCharts.tops;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          <CloseIcon size={24} color="#666" />
        </button>

        <h2 style={styles.title}>{chart.title}</h2>
        
        <table style={styles.table}>
          <thead>
            <tr>
              {chart.headers.map((header, i) => (
                <th key={i} style={styles.th}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={styles.td}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.tips}>
          <h3 style={styles.tipsTitle}>Measurement Tips:</h3>
          <ul style={styles.tipsList}>
            <li>Measure yourself in underwear or tight-fitting clothes</li>
            <li>Keep the tape measure parallel to the floor</li>
            <li>Don't pull the tape too tight or too loose</li>
            <li>If between sizes, we recommend sizing up</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "700px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "40px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  th: {
    backgroundColor: "#f5f5f5",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  tips: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
  },
  tipsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    lineHeight: "1.8",
  },
};
