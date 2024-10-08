import { Typography, CssBaseline, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { useEffect, useMemo, useState } from "react";
import { API_INSTANCE } from "../../services/BaseService";
import { setAuthentication } from "../../state/authSlice/authSlice";
import MyAppBar from "../../components/appBar/appBar.component";
import AlertDialog from "../../components/alertDialog/alert.dialog.component";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const Navigation = () => {
  const theme = useTheme();
  // const classes = useStyles(theme);
  // const authenticated = useSelector<RootState>(
  //   (state) => state.auth.authanticated
  // );
  const dispatch = useDispatch<AppDispatch>();
  // useTryLogin();
  // console.log("Navigasyon mu önce");
  useAxiosInterceptor();
  useMemo(() => {
    const inner = async () => {
      await API_INSTANCE.get<{ isAdmin: boolean }>(
        apiUrl + "api/Authentication/IsLoggedIn"
      )
        .then((res) => {
          dispatch(
            setAuthentication({
              authanticated: true,
              isAdmin: res.data.isAdmin,
            })
          );
          // console.log("loggedIn?? is admin", res.data.isAdmin);
        })
        .catch((err) => {
          // console.log("error hiç çalışıyor mu", err);
          dispatch(setAuthentication({ authanticated: false, isAdmin: false }));
        });
    };
    inner();
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
          <AlertDialog />
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
