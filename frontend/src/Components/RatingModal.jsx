import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography, Box, TextField, CircularProgress, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddRatingMutation,
  useGetSingleStudentQuery,
} from "../Redux/API/courseAPI";
import useUserAuth from "./Hooks/useUserAuth";
import Toast from "./Toast";
import { useParams } from "react-router-dom";

const schema = z.object({
  rating: z.number().min(1, "Please provide a rating..."),
  comment: z.string().min(1, "Comment is required"),
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 420 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(30,41,59,0.25)",
  p: 4,
};

const RatingModal = ({ open, handleClose, refetchRatings }) => {
  const params = useParams();
  const { refetch } = useGetSingleStudentQuery({ id: params.id });
  const [message, setMessage] = useState(null);
  const { user } = useUserAuth();
  const [addRating] = useAddRatingMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, userID: user?.id, courseID: params.id };
      const response = await addRating(formData).unwrap();
      setMessage(response?.message);
      reset();
      handleClose();
      if (refetchRatings) refetchRatings();
      if (refetch) refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {message && <Toast value={message} />}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        disableEscapeKeyDown
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              className="font-montserrat"
              sx={{ color: "#1e293b" }}
            >
              Leave your Review
            </Typography>
            <Typography className="font-roboto" sx={{ fontSize: "12px", color: "#e91367", mt: 0.5 }}>
              * A rating and review are required to complete your enrollment.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <Avatar
                alt={user?.fullname}
                src={`https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(user?.fullname || "user")}`}
                sx={{ width: 36, height: 36 }}
              />
              <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#64748b" }}>
                {user?.fullname}
              </Typography>
            </Box>

            <div className="flex justify-center flex-col gap-1 mt-5">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    onChange={(e, newValue) => field.onChange(newValue)}
                    size="large"
                    sx={{ color: "#f59e0b" }}
                  />
                )}
              />
              {errors.rating && (
                <span className="text-sm text-red-500 font-roboto">
                  {errors.rating.message}
                </span>
              )}
            </div>
            <TextField
              {...register("comment")}
              name="comment"
              placeholder="leave your thoughts..."
              variant="standard"
              margin="dense"
              error={!!errors.comment}
              helperText={errors.comment?.message}
              fullWidth
              multiline
              minRows={2}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              sx={{ mt: 3, px: 3, float: "right" }}
            >
              {isSubmitting ? (
                <CircularProgress size="20px" sx={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default RatingModal;
