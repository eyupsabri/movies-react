import { SxProps, Theme, alpha } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  container: {
    // background: alpha(theme.palette.primary.light, 0.5),
    // padding: theme.spacing(8, 0, 6),
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title_textfield: {
    width: "97%",
  },
  bottom_container: {
    display: "flex",
    alignItems: "center",
    mt: 2,
  },
  button_container: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
  },
});
