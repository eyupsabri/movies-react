import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Box,
  Button,
  Popover,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Login } from "@mui/icons-material";
import { useStyles } from "./Navigation.styles";
import { useTheme } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { useEffect, useState } from "react";
import { API_INSTANCE } from "../../services/BaseService";
import { AccountCircleOutlined } from "@mui/icons-material";
import { setAuthentication } from "../../state/authSlice/authSlice";
import MyAppBar from "../../components/appBar/appBar.component";

const Navigation = () => {
  const theme = useTheme();
  // const classes = useStyles(theme);
  // const authenticated = useSelector<RootState>(
  //   (state) => state.auth.authanticated
  // );
  const dispatch = useDispatch<AppDispatch>();
  // useTryLogin();
  useAxiosInterceptor();
  useEffect(() => {
    console.log("Kaç kere request gidiyor ya");
    API_INSTANCE.get<{ isAdmin: boolean }>(
      "https://localhost:7209/api/Authentication/IsLoggedIn"
    )
      .then((res) => {
        dispatch(
          setAuthentication({ authanticated: true, isAdmin: res.data.isAdmin })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const logout = () => {
  //   dispatch(setAuthentication({ authanticated: false, isAdmin: false }));
  //   localStorage.setItem("accessToken", "");
  //   localStorage.setItem("refreshToken", "");
  //   setAnchorEl(null);
  // };

  return (
    <>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <PhotoCamera sx={classes.icon} />
            <Typography variant="h6">Photo Album</Typography>
          </Box>
          {!authenticated ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              component={Link}
              to="/Login"
            >
              <Login sx={classes.icon} />
              <Typography variant="h6">Login</Typography>
            </Box>
          ) : (
            <>
              <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{ color: "inherit" }}
              >
                <AccountCircleOutlined />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Button sx={{ p: 2 }} onClick={logout}>
                  Log out
                </Button>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar> */}
      <MyAppBar />
      <Box
        sx={{
          display: "flex",
          minHeight: "93vh",
          flexDirection: "column",
          justifyContent: "spacebetween",
        }}
      >
        <main style={{ flexGrow: 1 }}>
          {/* <Box sx={classes.container}>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Photo Album
            </Typography>
            <Typography
              variant="h4"
              align="center"
              color="textSecondary"
              paragraph
            >
              Hello everyone this is a photo album i am trying to make this
              sentecnce as long as possible lets see how it looks
            </Typography>
            <Box sx={classes.buttons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    See my photos
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Movies /> */}
          <Outlet />
        </main>
        <footer
          style={{
            backgroundColor: theme.palette.background.paper,
            padding: "50px 0",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Something here to give the footer a purpose!
          </Typography>
        </footer>
      </Box>
    </>
  );
};

export default Navigation;
