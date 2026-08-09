import {
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { FILTER_CATEGORIES } from "../../constants/courseCategories";

const Lists = ({ courses = [] }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    let updatedCourses = courses;

    if (search) {
      updatedCourses = courses.filter((course) =>
        course.course_title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All" && !search) {
      updatedCourses = courses.filter((course) =>
        course.course_category.toLowerCase().includes(category.toLowerCase())
      );
    } else if (category !== "All") {
      updatedCourses = updatedCourses.filter((course) =>
        course.course_category.toLowerCase().includes(category.toLowerCase())
      );
    }

    setFilteredCourses(updatedCourses);
  };

  useEffect(() => {
    handleSearch();
  }, [search, category]);

  const coursesToDisplay =
    search || category !== "All" ? filteredCourses : courses;

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        sx={{
          background: "linear-gradient(140deg,#6d5ae6 0%,#e91367 120%)",
          borderRadius: "20px",
          p: { xs: 4, sm: 6 },
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          className="font-montserrat font-bold"
          sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
        >
          Explore Our Courses
        </Typography>
        <Typography variant="h6" className="font-poppins" sx={{ fontSize: "1rem", mt: 1, opacity: 0.9 }}>
          Find the best courses to upskill and achieve your goals!
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{ xs: 2, sm: 2 }}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Find your courses"
          variant="outlined"
          sx={{ width: { xs: "100%", sm: "340px" }, background: "#fff" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={18} color="#6d5ae6" />
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={{ fontWeight: 600, color: "#64748b" }}>OR</Typography>
        <TextField
          select
          onChange={(e) => setCategory(e.target.value)}
          label="Select by category"
          value={category}
          sx={{ width: { xs: "100%", sm: "300px" }, background: "#fff" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineCategory size={18} color="#e91367" />
              </InputAdornment>
            ),
          }}
        >
          {FILTER_CATEGORIES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack
        sx={{
          mt: 6,
          display: "grid",
          placeItems: "center",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          },
          gap: 3,
        }}
      >
        {coursesToDisplay.length > 0 ? (
          coursesToDisplay?.map((course, index) => (
            <Box
              key={index}
              className="card-soft overflow-hidden w-full max-w-[360px]"
              onClick={() =>
                navigate(`/course/${course._id}/detail`, { state: course })
              }
              sx={{ cursor: "pointer" }}
            >
              <Box sx={{ overflow: "hidden" }}>
                <img
                  src={course.instructor_image}
                  alt={course.course_title}
                  className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                />
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Typography
                  className="font-poppins"
                  sx={{
                    color: "#6d5ae6",
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    mb: 0.5,
                  }}
                >
                  {course.course_title}
                </Typography>
                <Typography
                  className="font-roboto"
                  sx={{ fontSize: "13px", color: "#64748b", wordWrap: "break-word" }}
                >
                  {course.course_desc.substring(0, 80)}...
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
                  <Typography className="font-montserrat" sx={{ fontSize: "18px", fontWeight: 700, color: "#e91367" }}>
                    ${course.course_price}
                  </Typography>
                  <Button
                    className="btn-primary"
                    sx={{ px: 2, py: 0.8, fontSize: "12px" }}
                    endIcon={<FaArrowRightLong size={12} />}
                  >
                    Read More
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ fontSize: "18px", textAlign: "center", color: "#64748b", mt: 4, gridColumn: "1/-1" }}>
            No course found. Try a different search or category.
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Lists;
