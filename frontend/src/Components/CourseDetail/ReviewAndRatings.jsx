import { useState } from "react";
import { Container, Stack, Typography, Box, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useGetAllRatingsQuery } from "../../Redux/API/courseAPI";
import { Link, useParams } from "react-router-dom";
import LoaderIcon from "../Loader";

function ReviewAndRatings() {
  const params = useParams();
  const [showComment, setShowComment] = useState(false);
  const { data, isLoading } = useGetAllRatingsQuery(params.id);

  if (isLoading) {
    return <LoaderIcon />;
  }
  return (
    <>
      {data?.comments?.length > 0 && (
        <Container maxWidth="lg" sx={{ mt: 6, zIndex: "0" }}>
          <Typography
            variant="h2"
            className="font-poppins"
            sx={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b" }}
          >
            <span className="text-gradient">Reviews and Ratings</span>
          </Typography>
          <Typography className="font-roboto" sx={{ fontSize: "13px", mt: 0.5, color: "#64748b" }}>
            Reviews and ratings are verified and from people who use the same
            type of device that you use.
          </Typography>

          <Box sx={{ mt: 3, p: 3, background: "#fff", borderRadius: "14px", border: "1px solid #e6e8f0" }}>
            <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: 600 }}>
              Overall Rating
            </Typography>
            <div className="flex items-center gap-2 mt-1">
              <p
                className="font-montserrat font-bold text-4xl"
                style={{ color: "#e91367" }}
              >
                {Number(data?.avgRating || 0).toFixed(1)}
              </p>
              <Rating value={data?.avgRating ?? 0} readOnly size="large" sx={{ color: "#f59e0b" }} />
            </div>
          </Box>

          <Link
            onClick={() => setShowComment(!showComment)}
            to=""
            className="font-roboto"
            style={{ color: "#6d5ae6", fontWeight: 600, fontSize: "14px", marginTop: 16, display: "inline-block" }}
          >
            {!showComment ? "See reviews ..." : "Hide reviews ..."}
          </Link>

          {showComment &&
            data?.comments?.map((comment, index) => (
              <Stack
                key={index}
                direction="column"
                gap={1.5}
                mt={2.5}
                className="card-soft p-4"
              >
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Avatar
                    alt={comment.created_by}
                    src={`https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(comment.created_by)}`}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography sx={{ color: "#1e293b", fontSize: "14px", fontWeight: 600 }}>
                      {comment.created_by}
                    </Typography>
                    {comment.rating ? (
                      <Rating value={comment.rating} readOnly size="small" sx={{ color: "#f59e0b" }} />
                    ) : null}
                  </Box>
                </Box>
                <Typography className="font-roboto" sx={{ fontSize: "14px", color: "#475569" }}>
                  {comment.text}
                </Typography>
              </Stack>
            ))}
        </Container>
      )}
    </>
  );
}

export default ReviewAndRatings;
