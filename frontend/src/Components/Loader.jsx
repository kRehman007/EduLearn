import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Logo from "../assets/LogoDesign.webp";

const LoaderIcon = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-appbg">
      <img src={Logo} alt="EduLearn" className="w-20 h-20 rounded-full object-cover animate-pulse" />
      <Box className="relative inline-flex">
        <CircularProgress
          size="3rem"
          sx={{ color: "#6d5ae6" }}
          thickness={4}
        />
        <CircularProgress
          size="1.4rem"
          sx={{ color: "#e91367", position: "absolute", top: "50%", left: "50%", marginTop: "-0.7rem", marginLeft: "-0.7rem" }}
          thickness={5}
        />
      </Box>
    </div>
  );
};

export default LoaderIcon;
