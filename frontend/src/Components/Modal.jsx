import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircularProgress, TextField, Avatar, Stack } from "@mui/material";
import { FaPhoneAlt, FaCity, FaGlobeAsia } from "react-icons/fa";
import { FiUser, FiMail } from "react-icons/fi";

import { useParams } from "react-router-dom";
import { useAddStudentMutation, useGetAllRatingsQuery } from "../Redux/API/courseAPI";
import { useAuth } from "./Hooks/useAuth";
import Toast from "./Toast";
import RatingModal from "./RatingModal";

const schema = z.object({
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Enter valid phone number")
    .max(15, "Phone number is too long"),
  city: z.string().nonempty("Please enter your city"),
  country: z.string().nonempty("Please enter your country"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 440 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(30,41,59,0.25)",
  p: 4,
};

const fieldIcons = {
  phone: <FaPhoneAlt size={15} color="#6d5ae6" />,
  city: <FaCity size={15} color="#6d5ae6" />,
  country: <FaGlobeAsia size={15} color="#6d5ae6" />,
};

export default function EnrollmentModal({ open, handleClose }) {
  const params = useParams();
  const { user } = useAuth();
  const [addStudent] = useAddStudentMutation();
  const { refetch } = useGetAllRatingsQuery();
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = {
        fullName: user?.fullname,
        email: user?.email,
        phone: data.phone,
        city: data.city,
        country: data.country,
        courseId: params.id,
      };
      const response = await addStudent(formData).unwrap();
      setMessage(response?.message);
      reset();
      handleClose();
      if (response?.message.includes("success")) {
        handleOpenRatingModal();
      }
      if (response?.emailSent === false && response?.message.includes("success")) {
        setTimeout(() => {
          setMessage("Enrolled successfully, but the confirmation email could not be sent. Please check your email address.");
        }, 3500);
      }
    } catch (error) {
      console.log("error in adding student", error);
      setMessage(error?.data?.message);
    }
  };

  const handleCloseRatingModal = () => setIsRatingModal(false);
  const handleOpenRatingModal = () => setIsRatingModal(true);

  return (
    <div>
      {message && <Toast value={message} severity={message.includes("success") || message.includes("enrolled") ? "success" : "warning"} />}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "linear-gradient(120deg,#6d5ae6,#e91367)",
              }}
            />
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              className="font-montserrat"
              sx={{ color: "#1e293b" }}
            >
              Enroll here
            </Typography>
          </Box>
          <Typography
            id="keep-mounted-modal-description"
            className="font-roboto"
            sx={{ fontSize: "13px", color: "#64748b" }}
          >
            Thank you for showing interest. Please proceed with the enrollment
            process.
          </Typography>

          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: "12px",
              background: "#eeebff",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              alt={user?.fullname}
              src={`https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(user?.fullname || "user")}`}
              sx={{ width: 44, height: 44, bgcolor: "#6d5ae6" }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <FiUser size={14} color="#6d5ae6" />
                <Typography className="font-poppins" sx={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>
                  {user?.fullname}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 0.3 }}>
                <FiMail size={13} color="#e91367" />
                <Typography className="font-roboto" sx={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.email}
                </Typography>
              </Stack>
            </Box>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col mt-4 gap-3">
              <TextField
                size="small"
                placeholder="Phone Number"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone")}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {fieldIcons.phone}
                    </Box>
                  ),
                }}
              />
              <TextField
                size="small"
                placeholder="City"
                type="text"
                error={!!errors.city}
                helperText={errors.city?.message}
                {...register("city")}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {fieldIcons.city}
                    </Box>
                  ),
                }}
              />
              <TextField
                size="small"
                placeholder="Country"
                type="text"
                error={!!errors.country}
                helperText={errors.country?.message}
                {...register("country")}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {fieldIcons.country}
                    </Box>
                  ),
                }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
                sx={{ py: 1.1, mt: 1 }}
              >
                {isSubmitting ? (
                  <CircularProgress size="24px" sx={{ color: "#fff" }} />
                ) : (
                  "Enroll"
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <RatingModal
        open={isRatingModal}
        handleClose={handleCloseRatingModal}
        refetchRatings={refetch}
      />
    </div>
  );
}
