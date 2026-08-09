import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

const Toast = ({ value, severity = "success" }) => {
  const [showToast, setShowToast] = useState(true);
  useEffect(() => {
    let timer;
    if (value) {
      setShowToast(true);
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  if (!value || !showToast) return null;

  return (
    <Alert
      variant="filled"
      severity={severity}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 3000,
        fontWeight: 600,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        padding: "10px 20px",
        animation: "fadeSlideIn 0.3s ease",
      }}
    >
      {value}
    </Alert>
  );
};

export default Toast;
