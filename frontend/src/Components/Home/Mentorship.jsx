import { Container, Typography, Box, Grid } from "@mui/material";
import { RiRoadMapLine, RiCompass3Line, RiGroupLine, RiBriefcase4Line, RiFeedbackLine, RiSearchEyeLine } from "react-icons/ri";

const steps = [
  {
    icon: <RiCompass3Line size={26} />,
    title: "Identify Goals",
    text: "Our mentors work with you to identify your career aspirations and create a roadmap tailored to your goals.",
  },
  {
    icon: <RiSearchEyeLine size={26} />,
    title: "Assess Skills",
    text: "We evaluate your current skills and recommend courses that align with your objectives and interests.",
  },
  {
    icon: <RiGroupLine size={26} />,
    title: "Weekly Sessions",
    text: "Engage in weekly sessions with experienced mentors who guide you through course material and projects.",
  },
  {
    icon: <RiBriefcase4Line size={26} />,
    title: "Real Projects",
    text: "Work on industry-relevant projects under expert guidance to build a portfolio that stands out.",
  },
  {
    icon: <RiFeedbackLine size={26} />,
    title: "Progress Feedback",
    text: "Receive regular feedback on your progress and actionable insights to improve your skills.",
  },
  {
    icon: <RiRoadMapLine size={26} />,
    title: "Career Support",
    text: "Get career advice, mock interview practice, and resume-building support to land your dream job.",
  },
];

const Mentorship = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 9 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "1.8rem", sm: "2rem" }, fontWeight: 700, color: "#1e293b" }}
        className="font-poppins"
      >
        Mentorship <span className="text-gradient">Process</span>
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: 500, color: "#e91367", mt: 0.5 }}>
        A Step-by-Step Journey to Success
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box className="card-soft p-6 h-full" sx={{ height: "100%" }}>
              <Box
                sx={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eeebff",
                  color: "#6d5ae6",
                  mb: 2,
                }}
              >
                {step.icon}
              </Box>
              <Typography className="font-poppins font-semibold" sx={{ fontSize: "17px", color: "#1e293b" }}>
                {step.title}
              </Typography>
              <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#64748b", mt: 1, lineHeight: 1.6 }}>
                {step.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Mentorship;
