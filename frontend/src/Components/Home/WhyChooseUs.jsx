import { Container, Typography, Box, Stack } from "@mui/material";
import { FaAward, FaBookOpen, FaHeadset, FaRocket } from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen size={22} />,
    title: "Expertly Curated Content",
    text: "Courses designed by industry professionals and educators who are passionate about fostering growth.",
  },
  {
    icon: <FaRocket size={22} />,
    title: "Skill-Focused Learning",
    text: "Gain not just knowledge but the practical skills needed to excel in your chosen field.",
  },
  {
    icon: <FaHeadset size={22} />,
    title: "Dedicated Support",
    text: "Interactive learning tools and dedicated support make learning an enjoyable, rewarding journey.",
  },
  {
    icon: <FaAward size={22} />,
    title: "Career Advancement",
    text: "A brighter future — enhance skills, explore interests, and achieve academic excellence with us.",
  },
];

const WhyChooseUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 9 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "1.8rem", sm: "2rem" }, fontWeight: 700, color: "#1e293b" }}
        className="font-poppins"
      >
        Why Choose <span className="text-gradient">Us</span>
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: 500, color: "#e91367", mt: 0.5 }}>
        Learn about us
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography className="font-roboto" sx={{ color: "#475569", lineHeight: 1.8, fontSize: "15px" }}>
          At EduLearn, we believe in empowering students by providing high-quality,
          accessible, and engaging courses designed to meet diverse learning needs.
          Our platform is built to ensure students not only gain knowledge but also
          develop the skills needed to excel in their chosen fields.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2.5}
        sx={{ mt: 4 }}
        flexWrap="wrap"
      >
        {features.map((feature, i) => (
          <Box
            key={i}
            className="card-soft p-5"
            sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }, minWidth: 0 }}
          >
            <Box
              sx={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fdeaf3",
                color: "#e91367",
                mb: 1.5,
              }}
            >
              {feature.icon}
            </Box>
            <Typography className="font-poppins font-semibold" sx={{ fontSize: "15px", color: "#1e293b" }}>
              {feature.title}
            </Typography>
            <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b", mt: 0.5, lineHeight: 1.6 }}>
              {feature.text}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default WhyChooseUs;
