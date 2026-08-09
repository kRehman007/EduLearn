import { useState, useEffect } from "react";
import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCourseMutation } from "../../Redux/API/courseAPI";
import LoaderIcon from "../Loader";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();
  const [getCourse, { isLoading }] = useGetCourseMutation();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      const res = await getCourse();
      setCourses(res?.data?.courses);
    };
    fetchAllCourses();
  }, []);

  if (isLoading) {
    return <LoaderIcon />;
  }

  const mentorsCount = courses?.filter(
    (course, index, self) =>
      self.findIndex((c) => c?.instructor_name === course?.instructor_name) ===
      index
  ).length;

  const scrollToMentors = () => {
    const el = document.getElementById("top-mentors");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg,#f6f7fb 0%,#eeebff 45%,#fdeaf3 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(233,19,103,0.09)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(109,90,230,0.12)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 7, sm: 10 }, pb: 4, position: "relative" }}>
        <Stack direction="column" gap={0} sx={{ maxWidth: 640 }}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  width: "max-content",
                  px: 2,
                  py: 0.7,
                  borderRadius: "999px",
                  background: "#eeebff",
                  color: "#5a47d6",
                  mb: 2,
                }}
              >
                <FiBookOpen size={15} />
                <Typography className="font-poppins" sx={{ fontSize: "13px", fontWeight: 600 }}>
                  Learn Anytime, Anywhere
                </Typography>
              </Stack>

              <Typography
                variant="h1"
                className="font-montserrat font-extrabold"
                sx={{
                  fontSize: { xs: "2.3rem", sm: "3rem", md: "3.4rem" },
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Welcome to <span className="text-gradient">EduLearn</span>
              </Typography>
              <Typography
                variant="h2"
                className="font-poppins font-semibold"
                sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem" }, color: "#e91367", mt: 0.5 }}
              >
                Gateway to Learn Anything
              </Typography>
              <Typography
                className="font-roboto"
                sx={{
                  fontSize: "1rem",
                  mt: 1.5,
                  color: "#475569",
                  maxWidth: "520px",
                  lineHeight: 1.7,
                }}
              >
                Unlock your potential with EduLearn, your gateway to mastering new
                skills. Dive into expert-led courses accessible anytime, anywhere,
                designed to fuel your curiosity and empower your career.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} sx={{ mt: 3 }}>
                <Button
                  onClick={() => navigate("/courses")}
                  className="btn-primary"
                  sx={{ px: 4, py: 1.3, fontSize: "15px" }}
                  endIcon={<FaArrowRightLong size={15} />}
                >
                  Browse Courses
                </Button>
                <Button
                  onClick={scrollToMentors}
                  startIcon={<RiUserStarLine size={16} />}
                  sx={{
                    px: 3,
                    py: 1.3,
                    fontSize: "15px",
                    color: "#6d5ae6",
                    background: "#fff",
                    border: "1px solid #6d5ae6",
                    fontWeight: 600,
                    "&:hover": { background: "#eeebff" },
                  }}
                >
                  Top Mentors
                </Button>
              </Stack>

              <Stack direction="row" gap={{ xs: 4, sm: 6 }} sx={{ mt: 4 }}>
                <Box>
                  <Typography className="font-montserrat" sx={{ fontSize: "1.9rem", fontWeight: 800, color: "#6d5ae6", lineHeight: 1 }}>
                    {courses?.length || 0}+
                  </Typography>
                  <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                    Courses
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 40, background: "#e6e8f0" }} />
                <Box>
                  <Typography className="font-montserrat" sx={{ fontSize: "1.9rem", fontWeight: 800, color: "#e91367", lineHeight: 1 }}>
                    {mentorsCount || 0}+
                  </Typography>
                  <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                    Expert Mentors
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 40, background: "#e6e8f0" }} />
                <Box>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <FaStar size={16} color="#f59e0b" />
                    <Typography className="font-montserrat" sx={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>
                      4.8
                    </Typography>
                  </Stack>
                  <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                    Avg Rating
                  </Typography>
                </Box>
              </Stack>
            </Stack>

        {courses?.length > 0 && (
          <>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 9, mb: 2 }} id="top-mentors">
              <RiUserStarLine size={24} color="#6d5ae6" />
              <Typography
                variant="h2"
                className="font-poppins font-semibold"
                sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem" }, color: "#1e293b" }}
              >
                Top Mentors
              </Typography>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={3}>
              {courses
                .filter(
                  (course, index, self) =>
                    self.findIndex(
                      (c) => c?.instructor_name === course?.instructor_name
                    ) === index
                )
                .slice(0, 4)
                .map((course, index) => (
                  <Box
                    key={index}
                    className="card-soft overflow-hidden w-full sm:w-1/4"
                  >
                    <img
                      src={course?.instructor_image}
                      alt={course?.course_title}
                      className="h-[220px] w-full object-cover"
                    />
                    <Box sx={{ p: 2.5 }}>
                      <Typography
                        className="font-poppins font-semibold"
                        sx={{ fontSize: "16px", color: "#1e293b" }}
                      >
                        {course?.course_title}
                      </Typography>
                      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
                        <FiBookOpen size={14} color="#e91367" />
                        <Typography sx={{ color: "#e91367", fontSize: "14px", fontWeight: 500 }}>
                          {course?.instructor_name}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                ))}
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Hero;
