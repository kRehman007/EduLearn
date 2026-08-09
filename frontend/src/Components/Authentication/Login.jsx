import { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LogoDesign.webp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useUserLogInMutation } from "../../Redux/API/userAPI";
import Toast from "../Toast";
import { useAuth } from "../Hooks/useAuth";
import { FiMail, FiLock } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [userLogIn] = useUserLogInMutation();
  const [msg, setMsg] = useState(null);
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userLogIn(data).unwrap();
      setUser(response?.user);
      reset();
      navigate("/");
    } catch (error) {
      setMsg(null);
      setTimeout(() => {
        setMsg(error?.data?.message);
      }, 0);
    }
  };

  return (
    <div className="w-full min-h-screen bg-appbg">
      {msg && <Toast value={msg} severity="error" />}
      <Container
        maxWidth="lg"
        sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: { xs: 6, md: 0 } }}
      >
        <Box
          className="card-soft overflow-hidden"
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "24px",
            border: "none",
          }}
        >
          <Box
            sx={{
              width: "46%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              background: "linear-gradient(140deg,#6d5ae6 0%,#8a7bf0 45%,#e91367 120%)",
              color: "#fff",
            }}
          >
            <img
              src={logo}
              alt="EduLearn"
              className="w-24 h-24 rounded-full object-cover mb-6 shadow-xl"
            />
            <Typography variant="h4" className="font-montserrat font-bold" sx={{ textAlign: "center" }}>
              Welcome back to EduLearn
            </Typography>
            <Typography className="font-roboto" sx={{ mt: 2, textAlign: "center", opacity: 0.9, fontSize: "15px" }}>
              Continue your learning journey. Sign in to access your courses,
              track progress and unlock your potential.
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "54%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: { xs: 6, md: 8 },
              px: { xs: 3, sm: 6 },
            }}
          >
            <img src={logo} className="w-16 h-16 rounded-full object-cover md:hidden mb-4" />
            <Typography variant="h5" className="font-montserrat font-bold" sx={{ color: "#1e293b" }}>
              Welcome to EduLearn
            </Typography>
            <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px", mt: 1, mb: 4 }}>
              Please sign in to continue
            </Typography>

            <form
              className="w-full max-w-sm flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <TextField
                label="Email"
                type="email"
                name="email"
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail size={16} color="#6d5ae6" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                size="small"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={16} color="#6d5ae6" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
                endIcon={!isSubmitting && <FaArrowRightLong size={16} />}
                sx={{ py: 1.2 }}
              >
                {isSubmitting ? (
                  <CircularProgress size="24px" sx={{ color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
              <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px" }}>
                Don&apos;t have an account?
              </Typography>
              <Typography
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#6d5ae6",
                  fontWeight: 600,
                  fontSize: "14px",
                  ml: 0.5,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                className="font-roboto"
              >
                Signup
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
