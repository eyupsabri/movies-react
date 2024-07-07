import { AccountCircleOutlined, Login, PhotoCamera } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setAuthentication } from "../../state/authSlice/authSlice";
import { useStyles } from "./appbar.styles";
import { Link } from "react-router-dom";
import AdminAppBar from "./adminAppBar/admin.appbar.component";

const MyAppBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const dispatch = useDispatch<AppDispatch>();
  const authanticated = useSelector<RootState>(
    (state) => state.auth.authanticated
  );
  // const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  console.log("isAdmin app bar storage", isAdmin);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const logout = () => {
    dispatch(setAuthentication({ authanticated: false, isAdmin: false }));
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setAnchorEl(null);
  };
  return (
    <AppBar position="relative">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {authanticated && isAdmin ? (
          <AdminAppBar />
        ) : (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <PhotoCamera sx={classes.icon} />
            <Typography variant="h6">Photo Album</Typography>
          </Box>
        )}

        {!authanticated ? (
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
    </AppBar>
  );
};

export default MyAppBar;
