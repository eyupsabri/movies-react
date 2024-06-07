import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useStyles } from "./admin.appbar.styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";

const AdminAppBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickMovies = () => {
    navigate("/admin");
    setAnchorEl(null);
  };
  const onClickAddMovie = () => {
    navigate("/admin/add-movie");
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button variant="outlined" sx={classes.button} onClick={handleClick}>
        <Typography variant="h6">Admin</Typography>
        {Boolean(anchorEl) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={onClickMovies}>Movies</MenuItem>
        <MenuItem onClick={onClickAddMovie}>Add Movie</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminAppBar;
