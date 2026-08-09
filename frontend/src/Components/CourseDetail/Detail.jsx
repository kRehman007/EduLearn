import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Stack, Box } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setDetail(location?.state);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h1"
        className="font-montserrat font-extrabold"
        sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" }, color: "#1e293b", letterSpacing: "-0.02em" }}
      >
        {detail?.course_title}
      </Typography>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{
          fontSize: "1.05rem",
          mt: 1,
          fontWeight: 500,
          color: "#e91367",
        }}
      >
        {detail?.course_sub_title}
      </Typography>
      <Typography
        className="font-roboto"
        sx={{ fontSize: "1rem", mt: 4, lineHeight: 1.8, color: "#475569" }}
      >
        {detail?.course_desc}
      </Typography>

      <Typography
        variant="h2"
        className="font-poppins"
        sx={{
          fontSize: "1.8rem",
          mt: 5,
          fontWeight: 700,
          color: "#1e293b",
        }}
      >
        <span className="text-gradient">Highlights</span>
      </Typography>
      <Stack gap={1.5} sx={{ mt: 3 }}>
        {detail?.highlights?.map((highlight, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <FaCheckCircle size={18} color="#6d5ae6" style={{ marginTop: 3 }} />
            <Typography className="font-roboto" sx={{ fontSize: "15px", color: "#334155", lineHeight: 1.6 }}>
              {highlight}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Detail;
