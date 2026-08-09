import { Typography, Container, Box, Stack, Link } from "@mui/material";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Logo from "../../assets/LogoDesign.webp";

const socials = [
  { icon: <BsFacebook />, href: "https://www.facebook.com/profile.php?id=100056951512316&mibextid=ZbWKwL" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/kashifdev/" },
  { icon: <FaSquareInstagram />, href: "https://www.instagram.com/k_rehman_007/profilecard/?igsh=MTNlZXd5aHpub3drMg==" },
  { icon: <FaGithub />, href: "https://github.com/kRehman007" },
];

const terms = [
  "User accounts",
  "Educational content",
  "Payment and refunds",
  "Governing law",
];

const Footer = () => {
  return (
    <Box sx={{ background: "#171a2b", padding: { xs: "50px 20px", sm: "60px" }, mt: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { sm: "space-between" },
            gap: { xs: 5, sm: 2 },
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="EduLearn"
                className="w-12 h-12 rounded-full object-cover mr-2"
              />
              <Typography
                variant="h5"
                className="font-montserrat font-bold"
                sx={{ color: "#fff" }}
              >
                EduLearn
              </Typography>
            </Box>
            <Box
              className="font-roboto"
              sx={{
                color: "#a5b0cf",
                display: "flex",
                gap: 2,
              }}
            >
              {socials.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "#a5b0cf",
                    fontSize: "24px",
                    transition: "all 0.2s",
                    "&:hover": { color: "#e91367", transform: "scale(1.1)" },
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography
              variant="h6"
              className="font-poppins"
              sx={{ color: "#fff", mb: 2 }}
            >
              Terms & Conditions
            </Typography>
            <Box className="font-roboto" sx={{ color: "#a5b0cf", display: "flex", flexDirection: "column", gap: 1 }}>
              {terms.map((term, i) => (
                <Typography key={i} sx={{ fontSize: "14px" }}>
                  {term}
                </Typography>
              ))}
            </Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography
              variant="h6"
              className="font-montserrat"
              sx={{ color: "#fff", mb: 2 }}
            >
              Contact Info
            </Typography>
            <Box className="font-roboto" sx={{ color: "#a5b0cf", display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: "14px" }}>+92 3314315567</Typography>
              <Typography sx={{ fontSize: "14px" }}>kashisial2327@gmail.com</Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", mt: 6, pt: 3 }}>
          <Typography
            className="text-center font-roboto"
            sx={{ color: "#a5b0cf", fontSize: "13px" }}
          >
            © {new Date().getFullYear()} EduLearn. All rights reserved. Kashif ur Rehman.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
