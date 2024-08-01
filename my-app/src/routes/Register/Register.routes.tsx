import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./Register.styles";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { RegisterType } from "../../types/Register.type";
import AuthService from "../../services/AuthService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setAlert } from "../../state/alertSlice/alertSlice";
import { setAuthentication } from "../../state/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

const MySchema = Yup.object({
  password: Yup.string()
    .min(6, "Password length should be greater than 6.")
    .max(16, "Password length should not be greater than 16.")
    .matches(/[0-9]/, "Password should contain at least 1 number")
    .matches(/[a-z]/, "Password should contain at least 1 small letter")
    .matches(/[A-Z]/, "Password should contain at least 1 capital letter")
    .matches(
      /[\!\?\*\.]/,
      "Password should contain at least 1 special character(!? *.)."
    )
    .required("Required."),
  confirmPassword: Yup.string()
    .required("Required.")
    .oneOf([Yup.ref("password")], "Passwords does not match."),
  name: Yup.string()
    .required("Required.")
    .matches(/^[A-Za-zşŞıİçÇöÖüÜĞğ ]+$/, "Wrong Name Format.")
    .min(3, "Name length should be greater than 3."),
  email: Yup.string().required("Required.").email("Wrong Email Format."),
});

const Register = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formMethods = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: yupResolver(MySchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const registerData: RegisterType = {
      email: data.email,
      password: data.password,
      name: data.name,
      IsAdmin: isAdmin,
      birthdate: selectedDate,
    };
    console.log(registerData);
    AuthService.register(registerData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(
          setAuthentication({ authanticated: true, isAdmin: res.data.isAdmin })
        );
        !res.data.isAdmin && navigate("/");
        res.data.isAdmin && navigate("/admin");
      })
      .catch((err) => {
        dispatch(setAlert({ message: err.response.data, type: "default" }));
      });
  };
  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 5, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Register
      </Typography>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={onChange}
            value={value}
          />
        )}
        name="name"
        defaultValue=""
      />
      {errors.name && (
        <Typography sx={{ mt: -1 }} color="error">
          {errors.name.message}
        </Typography>
      )}
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
        defaultValue=""
      />
      {errors.email && (
        <Typography sx={{ mt: -1 }} color="error">
          {errors.email.message}
        </Typography>
      )}

      <Box sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthday"
            sx={{ display: "flex" }}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              console.log(newValue);
            }}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </Box>

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
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && (
        <Typography sx={{ mt: -1 }} color="error">
          {errors.password.message}
        </Typography>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={onChange}
            value={value}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        name="confirmPassword"
        defaultValue=""
      />
      {errors.confirmPassword && (
        <Typography sx={{ mt: -1 }} color="error">
          {errors.confirmPassword.message}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2">Do you want to be an admin:</Typography>
        <Checkbox
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: "50%", alignSelf: "center" }}
        onClick={() => handleSubmit(onSubmit)()}
      >
        Register
      </Button>
    </Container>
  );
};
export default Register;
