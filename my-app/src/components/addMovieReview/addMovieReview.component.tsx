import {
  Box,
  Button,
  Card,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./addMovieReview.styles";
import { useForm, Controller } from "react-hook-form";

type Props = {
  onSubmit: (data: { title: string; review: string; rating: number }) => void;
};

const AddMovieReview = ({ onSubmit }: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const formMethods = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      review: "",
      rating: 5,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = formMethods;

  // const onSubmit = (data: {
  //   title: string;
  //   review: string;
  //   rating: number;
  // }) => {
  //   console.log(data);
  // };

  return (
    <Card sx={classes.card} elevation={2}>
      <Typography variant="h5" gutterBottom>
        Add Review
      </Typography>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-multiline-static"
            label="Title"
            multiline
            rows={1}
            defaultValue=""
            sx={{ width: "50%" }}
            value={value}
            onChange={onChange}
          />
        )}
        name="title"
        rules={{
          required: "Gerekli alan.",
        }}
        defaultValue=""
      />
      {errors.title && (
        <Typography sx={{ mt: 1 }} color="error">
          {errors.title.message}
        </Typography>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            sx={{ mt: 2 }}
            value={value}
            onChange={onChange}
          />
        )}
        name="review"
        rules={{
          required: "Gerekli alan.",
        }}
        defaultValue=""
      />
      {errors.review && (
        <Typography sx={{ mt: 1 }} color="error">
          {errors.review.message}
        </Typography>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Rating
            name="customized-10"
            max={10}
            sx={{ my: 2 }}
            value={value}
            onChange={onChange}
          />
        )}
        name="rating"
        rules={{
          required: "Gerekli alan.",
        }}
      />
      {errors.rating && (
        <Typography sx={{ mt: 1 }} color="error">
          {errors.rating.message}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={classes.button}
        onClick={async () => {
          await handleSubmit(onSubmit)();
          reset({
            title: "",
            review: "",
            rating: 5,
          });
        }}
      >
        Add Review
      </Button>
    </Card>
  );
};

export default AddMovieReview;
