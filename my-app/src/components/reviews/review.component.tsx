import { HandymanOutlined, Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Typography,
} from "@mui/material";
import { MovieReviewType } from "../../types/MovieReview.type";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MovieWithAuthService from "../../services/MovieWithAuthService";
import { useState } from "react";

type ReviewType = {
  review: MovieReviewType;
  handleRefresh: () => void;
};

const Review = ({ review, handleRefresh }: ReviewType) => {
  const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);
  const [visible, setVisible] = useState(true);

  const dateToString = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  const deleteReview = async () => {
    await MovieWithAuthService.deleteMovieReview(review.id).then((response) => {
      if (response.status === 200) {
        setVisible(false);
        setTimeout(handleRefresh, 500);
      }
    });
  };
  return (
    <Fade in={visible} timeout={500}>
      <Card key={review.id} sx={{ mt: 1, px: 1 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              {/* <Typography>Created: {review.created}</Typography> */}
              <Typography variant="subtitle1">Reviewed by:</Typography>
              <Typography>{review.userName}</Typography>
              <Box
                sx={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Star />
                <Typography>{review.star}/10</Typography>
              </Box>
            </Box>
            {isAdmin ? (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={deleteReview}
              >
                <DeleteForeverIcon fontSize="inherit" />
              </IconButton>
            ) : null}
          </Box>
        </CardContent>
        <CardHeader title={review.title} />

        <CardContent>
          <Typography>{review.description}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>Created: {dateToString(review.created)}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default Review;
