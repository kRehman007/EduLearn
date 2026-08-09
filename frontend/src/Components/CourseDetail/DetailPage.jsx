import { Container, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Detail from "./Detail";
import Detail2 from "./Detail2";
import ReviewAndRatings from "./ReviewAndRatings";
import FAQ from "./FAQ";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";

const DetailPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Tooltip title="Go back">
          <IconButton
            onClick={() => navigate(-1)}
            aria-label="Go back"
            sx={{
              width: 42,
              height: 42,
              background: "#eeebff",
              color: "#6d5ae6",
              transition: "all 0.2s ease",
              "&:hover": { background: "#6d5ae6", color: "#fff" },
            }}
          >
            <FaArrowLeft size={17} />
          </IconButton>
        </Tooltip>
      </Container>
      <Detail />
      <Detail2 />
      <ReviewAndRatings />
      <FAQ />
      <Footer />
    </div>
  );
};

export default DetailPage;
