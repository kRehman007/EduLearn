import { Container, Typography, Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../Redux/API/courseAPI";
import { FaChalkboardTeacher, FaDollarSign, FaGlobe, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const Detail2 = () => {
  const params = useParams();
  const { data } = useGetSingleStudentQuery({ id: params.id });
  const [detail, setDetail] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setDetail(location?.state);
  }, []);

  const infoItems = [
    { icon: <FaChalkboardTeacher size={15} />, label: "Instructor Name", value: detail?.instructor_name },
    { icon: <FaDollarSign size={15} />, label: "Price", value: `$${detail?.course_price}` },
    { icon: <MdCategory size={15} />, label: "Category", value: detail?.course_category },
    { icon: <FaGlobe size={15} />, label: "Language", value: "English" },
    { icon: <FaUsers size={15} />, label: "Enrolled Students", value: data?.totalStudents ?? 0 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h2"
        className="font-poppins"
        sx={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b" }}
      >
        <span className="text-gradient">Course Details</span>
      </Typography>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
          gap: 4,
        }}
        mt={3}
      >
        <Box
          className="card-soft p-6 h-full"
          sx={{ wordWrap: "break-word", order: { xs: 2, sm: 1 } }}
        >
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2.5 }}>
            <Box
              sx={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#eeebff",
                color: "#6d5ae6",
              }}
            >
              <FaChalkboardTeacher size={20} />
            </Box>
            <Typography className="font-poppins font-semibold" sx={{ fontSize: "17px", color: "#1e293b" }}>
              About the Instructor
            </Typography>
          </Stack>

          <Stack direction="column" gap={1.5}>
            {infoItems.map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box sx={{ color: "#e91367", fontSize: "15px", mt: 0.4 }}>{item.icon}</Box>
                <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{item.label}: </span>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 2.5, p: 2, background: "#fdeaf3", borderRadius: "12px" }}>
            <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#334155", lineHeight: 1.7 }}>
              <span style={{ fontWeight: 600, color: "#e91367" }}>Instructor Bio: </span>
              {detail?.instructor_bio}
            </Typography>
          </Box>
        </Box>

        <Box
          className="card-soft overflow-hidden"
          sx={{ order: { xs: 1, sm: 2 }, minHeight: { xs: "260px", sm: "100%" } }}
        >
          <img
            src={detail?.instructor_image}
            alt={detail?.course_title}
            className="w-full h-full min-h-[260px] object-cover"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Detail2;
