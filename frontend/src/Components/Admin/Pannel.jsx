import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  MenuItem,
} from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import { FaPlus, FaStar, FaQuestionCircle, FaCamera } from "react-icons/fa";
import { useAddCourseMutation } from "../../Redux/API/courseAPI";
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";
import Toast from "../Toast";
import { COURSE_CATEGORIES } from "../../constants/courseCategories";

const schema = z.object({
  name: z.string().nonempty("Instructor Name is required"),
  bio: z.string().nonempty("Instructor Bio is required"),
  title: z.string().nonempty("Course Title is required"),
  subtitle: z.string().nonempty("Subtitle is required"),
  desc: z.string().nonempty("Course description is required"),
  price: z.string().nonempty("Price is required"),
  category: z.string().nonempty("Course category is required"),
  highlights: z
    .array(z.string().nonempty("Highlight is required"))
    .min(1, "At least 1 highlight is required"),
  faqs: z
    .array(
      z.object({
        question: z.string().nonempty("Question is required"),
        answer: z.string().nonempty("Answer is required"),
      })
    )
    .min(1, "At least 1 FAQ is required"),
  file: z
    .any()
    .refine((file) => !file?.length, "Instructor picture is required")
    .refine(
      (file) => file?.type?.startsWith("image/"),
      "Only image files are allowed (JPG, PNG, WebP, etc.)"
    )
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "File size must not exceed 5MB"
    ),
});

const Pannel = () => {
  const [addCourse] = useAddCourseMutation();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("file", file);
    if (file && file.type?.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      highlights: [""],
      faqs: [{ question: "", answer: "" }],
      file: null,
    },
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlights" });

  const {
    fields: faqFields,
    append: appendFAQ,
    remove: removeFAQ,
  } = useFieldArray({ control, name: "faqs" });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("price", data.price);
      formData.append("description", data.desc);
      formData.append("category", data.category);
      formData.append("faqs", JSON.stringify(data.faqs));
      formData.append("highlights", JSON.stringify(data.highlights));
      data.file && formData.append("image", data.file);

      const response = await addCourse(formData).unwrap();
      setMessage(response?.message);

      setValue("name", "");
      setValue("bio", "");
      setValue("title", "");
      setValue("subtitle", "");
      setValue("price", "");
      setValue("desc", "");
      setValue("category", "");
      setValue("highlights", [""]);
      setValue("faqs", [{ question: "", answer: "" }]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImagePreview(null);
    } catch (error) {
      setMessage(error?.data?.message);
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <Nav />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {message && <Toast value={message} severity={message.includes("success") ? "success" : "error"} />}

        <Box
          sx={{
            background: "linear-gradient(140deg,#6d5ae6 0%,#e91367 120%)",
            borderRadius: "20px",
            p: { xs: 3, sm: 4 },
            color: "#fff",
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" className="font-montserrat font-bold">
            Add New Course
          </Typography>
          <Typography className="font-roboto" sx={{ mt: 0.5, opacity: 0.9, fontSize: "14px" }}>
            Fill in the details below to publish a new course on EduLearn
          </Typography>
        </Box>

        <Box className="card-soft" sx={{ p: { xs: 2.5, sm: 4 } }}>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <TextField
              label="Instructor Name"
              size="small"
              type="text"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              label="Instructor Bio"
              size="small"
              type="text"
              error={!!errors.bio}
              helperText={errors.bio?.message}
              {...register("bio")}
            />
            <TextField
              label="Course Title"
              size="small"
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title")}
            />
            <TextField
              label="Course Subtitle"
              size="small"
              type="text"
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
              {...register("subtitle")}
            />
            <TextField
              label="Course Price"
              placeholder="must be in number"
              size="small"
              type="text"
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price")}
            />
            <TextField
              label="Course Description"
              multiline
              rows={4}
              error={!!errors.desc}
              helperText={errors.desc?.message}
              {...register("desc")}
            />
            <TextField
              label="Course Category"
              select
              size="small"
              defaultValue=""
              error={!!errors.category}
              helperText={errors.category?.message}
              {...register("category")}
            >
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {COURSE_CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              <Typography
                className="font-poppins font-semibold"
                sx={{ fontSize: "14px", color: "#1e293b", mb: 1 }}
              >
                Instructor Picture
              </Typography>
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: errors.file
                    ? "2px dashed #ef4444"
                    : "2px dashed #cbd5e1",
                  borderRadius: "14px",
                  background: "#f8f9fd",
                  padding: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "#6d5ae6", background: "#eeebff" },
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Instructor Preview"
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      background: "#eeebff",
                      color: "#6d5ae6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaCamera size={20} />
                  </Box>
                )}
                <Box>
                  <Typography className="font-roboto" sx={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>
                    {imagePreview ? "Change picture" : "Upload instructor picture"}
                  </Typography>
                  <Typography className="font-roboto" sx={{ fontSize: "12px", color: "#64748b" }}>
                    Only images allowed (JPG, PNG, WebP) · Max 5MB
                  </Typography>
                </Box>
              </Box>
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {errors.file && (
                <Typography className="font-roboto" sx={{ fontSize: "12px", color: "#ef4444", mt: 0.5 }}>
                  {errors.file?.message}
                </Typography>
              )}
            </Box>

            <div className="flex flex-col gap-3 sm:col-span-2">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FaStar size={16} color="#6d5ae6" />
                <Typography variant="h6" sx={{ color: "#1e293b" }}>
                  Add Course Highlights
                </Typography>
              </Box>
              {highlightFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between gap-2 items-center"
                >
                  <TextField
                    label={`Highlight ${index + 1}`}
                    size="small"
                    error={!!errors.highlights?.[index]}
                    helperText={errors.highlights?.[index]?.message}
                    {...register(`highlights.${index}`)}
                    className="flex-1"
                  />
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fdeaf3",
                      color: "#e91367",
                      cursor: "pointer",
                      flexShrink: 0,
                      "&:hover": { background: "#fad0e2" },
                    }}
                    onClick={() => removeHighlight(index)}
                  >
                    <MdDeleteSweep size={20} />
                  </Box>
                </div>
              ))}
              <Button
                type="button"
                variant="outlined"
                startIcon={<FaPlus size={13} />}
                sx={{
                  borderColor: "#6d5ae6",
                  color: "#6d5ae6",
                  width: "max-content",
                  "&:hover": { background: "#eeebff", borderColor: "#6d5ae6" },
                }}
                onClick={() => appendHighlight("")}
              >
                Add Highlight
              </Button>
              {errors.highlights && !highlightFields.length && (
                <span className="text-red-500 font-roboto">{errors.highlights.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FaQuestionCircle size={17} color="#e91367" />
                <Typography variant="h6" sx={{ color: "#1e293b" }}>
                  Add FAQs
                </Typography>
              </Box>
              {faqFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2 border border-[#e6e8f0] rounded-lg p-3"
                >
                  <TextField
                    label={`Question ${index + 1}`}
                    size="small"
                    error={!!errors.faqs?.[index]?.question}
                    helperText={errors.faqs?.[index]?.question?.message}
                    {...register(`faqs.${index}.question`)}
                  />
                  <TextField
                    label={`Answer ${index + 1}`}
                    size="small"
                    error={!!errors.faqs?.[index]?.answer}
                    helperText={errors.faqs?.[index]?.answer?.message}
                    {...register(`faqs.${index}.answer`)}
                  />
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fdeaf3",
                      color: "#e91367",
                      cursor: "pointer",
                      alignSelf: "flex-end",
                      "&:hover": { background: "#fad0e2" },
                    }}
                    onClick={() => removeFAQ(index)}
                  >
                    <MdDeleteSweep size={20} />
                  </Box>
                </div>
              ))}
              <Button
                type="button"
                variant="outlined"
                startIcon={<FaPlus size={13} />}
                sx={{
                  borderColor: "#e91367",
                  color: "#e91367",
                  width: "max-content",
                  "&:hover": { background: "#fdeaf3", borderColor: "#e91367" },
                }}
                onClick={() => appendFAQ({ question: "", answer: "" })}
              >
                Add FAQ
              </Button>
              {errors.faqs && (
                <span className="text-red-500 font-roboto">{errors.faqs.message}</span>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="btn-primary w-max"
              sx={{ py: 1.1, px: 4, mt: 1 }}
            >
              {isSubmitting ? (
                <CircularProgress size="24px" sx={{ color: "#fff" }} />
              ) : (
                "Submit Course"
              )}
            </Button>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Pannel;
