import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import AuthService from "../../services/AuthService";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../state/authSlice/authSlice";
import { useStyles } from "./Login.styles";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const authenticated = useSelector<RootState>(
    (state) => state.auth.authanticated
  );
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    AuthService.login(data.email, data.password)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(
          setAuthentication({ authanticated: true, isAdmin: res.data.isAdmin })
        );
        !res.data.isAdmin && navigate(-1);
        res.data.isAdmin && navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuthentication({ authanticated: false, isAdmin: false }));
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={classes.icon_container}>
          <LockOutlined sx={{ fontSize: 70, mb: 2 }} />
        </Box>
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Login
        </Typography>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: "Gerekli alan.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail yanlış görünüyor",
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Typography sx={{ mt: -1 }} color="error">
            {errors.email.message}
          </Typography>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={onChange}
              value={value}
            />
          )}
          rules={{
            required: "Gerekli alan.",
          }}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Typography sx={{ mt: -1 }} color="error">
            {errors.password.message}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "50%", alignSelf: "center" }}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Login
        </Button>
        <Typography sx={{ mt: 2 }} align="center">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
      {/* {authenticated ? <Navigate to="/" /> : null} */}
    </Container>
  );
};

export default Login;
