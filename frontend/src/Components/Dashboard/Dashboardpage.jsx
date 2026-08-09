import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCourseMutation,
  useGetTotalStudentsMutation,
} from "../../Redux/API/courseAPI";
import Toast from "../Toast";
import Nav from "../Home/Nav";
import { useAuth } from "../Hooks/useAuth";
import LoaderIcon from "../Loader";
import Footer from "../Home/Footer";
import ManageCourses from "./ManageCourses";
import { FiBookOpen, FiUsers, FiPlusCircle, FiEye, FiClock } from "react-icons/fi";

const Dashboardpage = () => {
  const { user } = useAuth();
  const [msg, setMsg] = useState(null);
  const [lastcourse, setLastCourse] = useState("");
  const [recentStudent, setRecentStudent] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState();
  const [getCourse] = useGetCourseMutation();
  const [getTotalStudent, { isLoading }] = useGetTotalStudentsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getCourse();
      const TotalCourses = response?.data?.courses;
      setAllCourses(TotalCourses || []);
      setLastCourse(TotalCourses?.[TotalCourses.length - 1]);
    };
    const fetchAllStudents = async () => {
      const Total = await getTotalStudent();
      const AllStudents = Total?.data?.total;
      if (AllStudents?.length) {
        setRecentStudent(AllStudents[AllStudents.length - 1].fullName);
        setTotalStudents(AllStudents.length);
      }
    };
    fetchCourseData();
    fetchAllStudents();
  }, []);

  const handleCourses = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      setMsg(null);
      setTimeout(() => {
        setMsg("You are unauthorized to access this route");
      }, 0);
    }
  };

  if (isLoading) {
    return <LoaderIcon />;
  }

  const stats = [
    {
      icon: <FiBookOpen size={26} />,
      label: "Total Courses",
      value: allCourses.length,
      bg: "#eeebff",
      color: "#6d5ae6",
    },
    {
      icon: <FiUsers size={26} />,
      label: "Total Students",
      value: totalStudents || 0,
      bg: "#fdeaf3",
      color: "#e91367",
    },
  ];

  return (
    <>
      {msg && <Toast value={msg} severity="warning" />}
      <Nav />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          className="font-montserrat font-bold"
          sx={{ textAlign: "center", mb: 4, color: "#1e293b" }}
        >
          Admin <span className="text-gradient">Dashboard</span>
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card className="card-soft" sx={{ border: "none" }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: stat.bg,
                      color: stat.color,
                      flexShrink: 0,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px" }}>
                      {stat.label}
                    </Typography>
                    <Typography className="font-montserrat" sx={{ fontSize: "2rem", fontWeight: 700, color: stat.color, lineHeight: 1.2 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} md={8}>
            <Card className="card-soft" sx={{ border: "none", height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <FiPlusCircle size={18} color="#6d5ae6" />
                  <Typography variant="h6" sx={{ color: "#1e293b" }}>
                    Manage Courses
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<FiEye size={15} />}
                  sx={{
                    borderColor: "#6d5ae6",
                    color: "#6d5ae6",
                    mr: 2,
                    "&:hover": { background: "#eeebff", borderColor: "#6d5ae6" },
                  }}
                  onClick={() => navigate("/courses")}
                >
                  View All Courses
                </Button>
                <Button
                  className="btn-primary"
                  startIcon={<FiPlusCircle size={15} />}
                  sx={{ px: 2 }}
                  onClick={handleCourses}
                >
                  Add New Course
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="card-soft" sx={{ border: "none", height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <FiClock size={17} color="#e91367" />
                  <Typography variant="h6" sx={{ color: "#1e293b" }}>
                    Recent Activity
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                  <Box sx={{ p: 1.5, background: "#eeebff", borderRadius: "10px" }}>
                    <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                      New Course Added
                    </Typography>
                    <Typography className="font-poppins" sx={{ fontSize: "14px", fontWeight: 600, color: "#6d5ae6" }}>
                      {lastcourse?.course_title || "—"}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1.5, background: "#fdeaf3", borderRadius: "10px" }}>
                    <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                      New Enrollment
                    </Typography>
                    <Typography className="font-poppins" sx={{ fontSize: "14px", fontWeight: 600, color: "#e91367" }}>
                      {recentStudent || "—"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <ManageCourses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboardpage;
