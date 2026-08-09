import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Stack,
  Modal,
  Rating,
} from "@mui/material";
import { FaTrashAlt, FaEye, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { MdCategory, MdOutlinePeopleAlt } from "react-icons/md";
import { FaGlobe } from "react-icons/fa6";
import {
  useGetCourseMutation,
  useDeleteCourseMutation,
  useGetSingleStudentQuery,
  useGetAllRatingsQuery,
} from "../../Redux/API/courseAPI";
import Toast from "../Toast";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 420 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(30,41,59,0.25)",
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

const CourseDetailsModal = ({ course, open, onClose }) => {
  const { data } = useGetSingleStudentQuery(
    { id: course?._id },
    { skip: !course }
  );
  const { data: ratingsData } = useGetAllRatingsQuery(
    course?._id,
    { skip: !course }
  );

  if (!course) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <img
          src={course.instructor_image}
          alt={course.course_title}
          className="w-full h-[200px] object-cover rounded-xl mb-4"
        />
        <Typography
          variant="h6"
          className="font-montserrat"
          sx={{ color: "#1e293b", fontWeight: 700 }}
        >
          {course.course_title}
        </Typography>
        <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#e91367", fontWeight: 500 }}>
          {course.course_sub_title}
        </Typography>

        <Stack direction="column" gap={1} sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <FaCheckCircle size={15} color="#6d5ae6" />
            <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
              <b>Instructor:</b> {course.instructor_name}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <FaDollarSign size={15} color="#6d5ae6" />
            <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
              <b>Price:</b> ${course.course_price}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdCategory size={15} color="#6d5ae6" />
            <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
              <b>Category:</b> {course.course_category}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <FaGlobe size={15} color="#6d5ae6" />
            <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
              <b>Language:</b> English
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <MdOutlinePeopleAlt size={15} color="#6d5ae6" />
            <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#334155" }}>
              <b>Enrolled Students:</b> {data?.totalStudents ?? 0}
            </Typography>
          </Stack>
          {ratingsData?.avgRating ? (
            <Stack direction="row" alignItems="center" gap={1}>
              <Rating
                value={ratingsData.avgRating}
                readOnly
                size="small"
                sx={{ color: "#f59e0b" }}
              />
              <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                ({Number(ratingsData.avgRating).toFixed(1)})
              </Typography>
            </Stack>
          ) : null}
        </Stack>

        <Box sx={{ mt: 2, p: 2, background: "#f8f9fd", borderRadius: "12px" }}>
          <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>
            {course.course_desc}
          </Typography>
        </Box>

        <Stack direction="column" gap={1} sx={{ mt: 2 }}>
          <Typography className="font-poppins font-semibold" sx={{ fontSize: "14px", color: "#1e293b" }}>
            Highlights
          </Typography>
          {course.highlights?.map((h, i) => (
            <Stack key={i} direction="row" alignItems="center" gap={1}>
              <FaCheckCircle size={13} color="#e91367" />
              <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#475569" }}>
                {h}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Button className="btn-primary" onClick={onClose} sx={{ mt: 3, width: "100%", py: 1 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const DeleteConfirmModal = ({ course, open, onClose, onConfirm, deleting }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: { xs: "92%", sm: 380 }, textAlign: "center" }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#fdeaf3",
            color: "#e91367",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <FaTrashAlt size={26} />
        </Box>
        <Typography
          variant="h6"
          className="font-montserrat"
          sx={{ color: "#1e293b", fontWeight: 700 }}
        >
          Delete Course?
        </Typography>
        <Typography className="font-roboto" sx={{ color: "#64748b", fontSize: "14px", mt: 1 }}>
          Are you sure you want to delete{" "}
          <b style={{ color: "#1e293b" }}>{course?.course_title}</b>? This action
          cannot be undone and will also remove all its enrollments and ratings.
        </Typography>
        <Stack direction="row" gap={1.5} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              borderColor: "#cbd5e1",
              color: "#475569",
              "&:hover": { borderColor: "#94a3b8", background: "#f8f9fd" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={deleting}
            sx={{
              flex: 1,
              background: "#e91367",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { background: "#c60e57" },
            }}
          >
            {deleting ? <CircularProgress size="20px" sx={{ color: "#fff" }} /> : "Delete"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const ManageCourses = () => {
  const [getCourse] = useGetCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [deleteCourseData, setDeleteCourseData] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await getCourse().unwrap();
      setCourses(res?.courses || []);
    } catch {
      setMessage("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!deleteCourseData) return;
    setDeleting(true);
    try {
      const res = await deleteCourse(deleteCourseData._id).unwrap();
      setMessage(res?.message);
      setDeleteCourseData(null);
      fetchCourses();
    } catch (error) {
      setMessage(error?.data?.message || "Failed to delete course.");
      setDeleteCourseData(null);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Box>
      {message && <Toast value={message} severity={message.includes("success") ? "success" : "error"} />}

      <Typography
        variant="h5"
        className="font-poppins font-semibold"
        sx={{ mb: 2, color: "#1e293b" }}
      >
        Manage Courses
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress sx={{ color: "#6d5ae6" }} />
        </Box>
      ) : courses.length === 0 ? (
        <Box className="card-soft" sx={{ p: 4, textAlign: "center" }}>
          <Typography className="font-roboto" sx={{ color: "#64748b" }}>
            No courses available yet.
          </Typography>
        </Box>
      ) : (
        <Stack direction="column" gap={2}>
          {courses.map((course) => (
            <Box
              key={course._id}
              className="card-soft"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: { xs: 1.5, sm: 2 },
                p: 2,
              }}
            >
              <img
                src={course.instructor_image}
                alt={course.course_title}
                className="w-full sm:w-24 h-28 sm:h-20 object-cover rounded-xl flex-shrink-0"
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  className="font-poppins font-semibold"
                  sx={{ fontSize: "15px", color: "#1e293b" }}
                >
                  {course.course_title}
                </Typography>
                <Typography className="font-roboto" sx={{ fontSize: "13px", color: "#64748b" }}>
                  {course.course_category} · ${course.course_price}
                </Typography>
                <Typography className="font-roboto" sx={{ fontSize: "12px", color: "#64748b" }}>
                  Instructor: {course.instructor_name}
                </Typography>
              </Box>
              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<FaEye size={14} />}
                  onClick={() => setViewCourse(course)}
                  sx={{
                    borderColor: "#6d5ae6",
                    color: "#6d5ae6",
                    fontSize: "12px",
                    "&:hover": { background: "#eeebff", borderColor: "#6d5ae6" },
                  }}
                >
                  View
                </Button>
                <Button
                  startIcon={<FaTrashAlt size={13} />}
                  onClick={() => setDeleteCourseData(course)}
                  sx={{
                    background: "#fdeaf3",
                    color: "#e91367",
                    fontSize: "12px",
                    "&:hover": { background: "#fad0e2" },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      <CourseDetailsModal
        course={viewCourse}
        open={!!viewCourse}
        onClose={() => setViewCourse(null)}
      />

      <DeleteConfirmModal
        course={deleteCourseData}
        open={!!deleteCourseData}
        onClose={() => setDeleteCourseData(null)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </Box>
  );
};

export default ManageCourses;
