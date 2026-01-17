import { useEffect } from "react";
import { CheckIcon, ErrorIcon, WarningIcon, InfoIcon, CloseIcon } from "./Icons";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckIcon size={24} color="#fff" />;
      case "error":
        return <ErrorIcon size={24} color="#fff" />;
      case "warning":
        return <WarningIcon size={24} color="#fff" />;
      case "info":
        return <InfoIcon size={24} color="#fff" />;
      default:
        return <CheckIcon size={24} color="#fff" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#f44336";
      case "warning":
        return "#ff9800";
      case "info":
        return "#2196F3";
      default:
        return "#4CAF50";
    }
  };

  const styles = {
    toast: {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: getBackgroundColor(),
      color: "#fff",
      padding: "16px 24px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      zIndex: 10000,
      animation: "slideIn 0.3s ease",
      minWidth: "300px",
      maxWidth: "500px",
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    message: {
      flex: 1,
      fontSize: "16px",
      fontWeight: "500",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: "0",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.toast}>
      <span style={styles.icon}>{getIcon()}</span>
      <span style={styles.message}>{message}</span>
      <button style={styles.closeButton} onClick={onClose}>
        <CloseIcon size={20} color="#fff" />
      </button>
    </div>
  );
}
