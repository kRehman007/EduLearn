import { useEffect, useState } from "react";
import { Container, Typography, Stack, Box, Button } from "@mui/material";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useParams } from "react-router-dom";
import { useGetEnrollmentStatusQuery } from "../../Redux/API/courseAPI";
import { useAuth } from "../Hooks/useAuth";
import EnrollmentModal from "../Modal";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [detail, setDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();
  const params = useParams();
  const { data: enrollmentStatus } = useGetEnrollmentStatusQuery(params.id);

  useEffect(() => {
    setDetail(location?.state);
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isEnrolled = enrollmentStatus?.enrolled;
  const isAdmin = user?.role === "admin";

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b" }}
      >
        <span className="text-gradient">FAQ Section</span>
      </Typography>

      <Stack direction="column" mt={3} gap={2}>
        {detail?.faqs?.map((faq, index) => (
          <Stack key={index} className="flex flex-col gap-2">
            <Box
              className="card-soft w-full p-4 text-lg flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
              sx={{ px: 3, py: 2.5 }}
            >
              <Typography className="font-poppins" sx={{ fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>
                {faq.question}?
              </Typography>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeIndex === index ? "#fdeaf3" : "#eeebff",
                  color: activeIndex === index ? "#e91367" : "#6d5ae6",
                  flexShrink: 0,
                }}
              >
                {activeIndex === index ? (
                  <RxCross2 size={20} />
                ) : (
                  <FaPlus size={16} />
                )}
              </Box>
            </Box>
            {activeIndex === index && (
              <Box className="card-soft w-full p-4 text-base" sx={{ px: 3 }}>
                <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#475569", lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </Box>
            )}
          </Stack>
        ))}
      </Stack>

      {!isAdmin && (
        <Button
          className={isEnrolled ? "" : "btn-primary"}
          disabled={isEnrolled}
          sx={{
            mt: 4,
            px: 5,
            py: 1.3,
            fontSize: "15px",
            ...(isEnrolled && {
              background: "#e2e8f0",
              color: "#64748b",
              cursor: "not-allowed",
              fontWeight: 700,
            }),
          }}
          onClick={() => setIsModalOpen(true)}
        >
          {isEnrolled ? (
            <>
              <FaCheckCircle size={18} style={{ marginRight: 8 }} />
              Enrolled
            </>
          ) : (
            "Enroll Now"
          )}
        </Button>
      )}

      <EnrollmentModal open={isModalOpen} handleClose={handleCloseModal} />
    </Container>
  );
};

export default FAQ;
