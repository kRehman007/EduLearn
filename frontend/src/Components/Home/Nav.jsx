import { AppBar, Stack, Toolbar, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoDesign.webp";
import { FiLogOut, FiHome, FiBookOpen, FiLayout, FiShield } from "react-icons/fi";

import { useUserLogOutMutation } from "../../Redux/API/userAPI";
import { useAuth } from "../Hooks/useAuth";

const navLinkStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  color: isActive ? "#6d5ae6" : "#1e293b",
  background: isActive ? "#eeebff" : "transparent",
  transition: "all 0.2s ease",
});

const Nav = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [userLogOut] = useUserLogOutMutation();

  const handleLogOut = async () => {
    try {
      await userLogOut().unwrap();
      navigate("/login");
      setUser(null);
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e6e8f0",
        zIndex: "1000",
        padding: { xs: "4px 12px", sm: "4px 40px" },
      }}
    >
      <Toolbar sx={{ minHeight: "64px" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-11 h-11 rounded-full object-cover mr-2 cursor-pointer"
          />
          <span
            className="font-montserrat font-bold text-xl hidden sm:block cursor-pointer"
            style={{ background: "linear-gradient(120deg,#6d5ae6,#e91367)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            EduLearn
          </span>
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 0.5 }}
          alignItems="center"
        >
          <NavLink to="/" style={navLinkStyle}>
            <FiHome size={15} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/courses" style={navLinkStyle}>
            <FiBookOpen size={15} />
            <span className="hidden sm:inline">Courses</span>
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" style={navLinkStyle}>
              <FiShield size={15} />
              <span className="hidden sm:inline">Add Course</span>
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/dashboard" style={navLinkStyle}>
              <FiLayout size={15} />
              <span className="hidden sm:inline">Admin</span>
            </NavLink>
          )}

          {user ? (
            <Button
              onClick={handleLogOut}
              className="font-montserrat"
              sx={{
                color: "#e91367",
                background: "#fdeaf3",
                ml: { xs: 0, sm: 1 },
                px: { xs: 1, sm: 2 },
                py: 0.8,
                borderRadius: "10px",
                "&:hover": { background: "#fad0e2" },
              }}
            >
              <FiLogOut size={15} className="mr-1" />
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{
                ml: 1,
                px: 2,
                py: 0.8,
                background: "#6d5ae6",
                color: "#fff",
                borderRadius: "10px",
                "&:hover": { background: "#5a47d6" },
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
