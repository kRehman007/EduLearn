import { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import logo from "../../assets/LogoDesign.webp";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useUserSignupMutation } from "../../Redux/API/userAPI";
import Toast from "../Toast";
import { FiMail, FiLock, FiUser, FiAtSign } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";

const schema = z.object({
  fullname: z.string().nonempty("Fullname is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().nonempty("Email is required").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be of 6 characters"),
});

const Signup = () => {
  const [userSignup] = useUserSignupMutation();
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await userSignup(data).unwrap();
      reset();
      navigate("/login");
    } catch (error) {
      setMsg(null);
      setTimeout(() => {
        setMsg(error?.data?.message);
      }, 0);
    }
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };

  return (
    <div className="w-full min-h-screen bg-appbg">
      {msg && <Toast value={msg} severity="error" />}
      <Container
        maxWidth="lg"
        sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: { xs: 6, md: 4 } }}
      >
        <Box
          className="card-soft overflow-hidden"
          sx={{ display: "flex", width: "100%", borderRadius: "24px", border: "none" }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "54%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: { xs: 6, md: 7 },
              px: { xs: 3, sm: 6 },
            }}
          >
            <img src={logo} className="w-16 h-16 rounded-full object-cover mb-4" />
            <Typography variant="h5" className="font-montserrat font-bold" sx={{ color: "#1e293b" }}>
              Create an Account
            </Typography>
            <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px", mt: 1, mb: 4 }}>
              Join EduLearn and start learning today
            </Typography>

            <form
              className="w-full max-w-sm flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <TextField
                label="FullName"
                type="text"
                name="fullname"
                size="small"
                {...register("fullname")}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={fieldStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiUser size={16} color="#6d5ae6" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="UserName"
                type="text"
                name="username"
                size="small"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={fieldStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiAtSign size={16} color="#6d5ae6" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={fieldStyle}
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
                sx={fieldStyle}
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
                  "Signup"
                )}
              </Button>
            </form>

            <Stack direction="row" alignItems="center" sx={{ mt: 3 }}>
              <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px" }}>
                Already have an account?
              </Typography>
              <Typography
                onClick={() => navigate("/login")}
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
                Login
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              width: "46%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
              background: "linear-gradient(140deg,#e91367 0%,#6d5ae6 120%)",
              color: "#fff",
            }}
          >
            <Typography variant="h4" className="font-montserrat font-bold" sx={{ textAlign: "center" }}>
              Start Your Learning Journey
            </Typography>
            <Typography className="font-roboto" sx={{ mt: 2, textAlign: "center", opacity: 0.9, fontSize: "15px" }}>
              Join thousands of learners gaining new skills with expert-led
              courses, mentorship and real-world projects.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
