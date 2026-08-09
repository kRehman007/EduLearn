import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-appbg px-4">
      <Typography
        className="font-montserrat font-extrabold"
        sx={{ fontSize: { xs: "5rem", sm: "8rem" }, lineHeight: 1 }}
      >
        <span className="text-gradient">404</span>
      </Typography>
      <Typography
        className="font-poppins"
        sx={{ color: "#1e293b", fontSize: { xs: "1.2rem", sm: "1.5rem" }, fontWeight: 600, mt: 1 }}
      >
        Page not found
      </Typography>
      <Typography className="font-roboto" sx={{ color: "#64748b", mt: 1, textAlign: "center" }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button
        onClick={() => navigate("/")}
        className="btn-primary"
        startIcon={<FiArrowLeft />}
        sx={{ mt: 3, px: 3, py: 1 }}
      >
        Go to HomePage
      </Button>
    </div>
  );
};

export default PageNotFound;
