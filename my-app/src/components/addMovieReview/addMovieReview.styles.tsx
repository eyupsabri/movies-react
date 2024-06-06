import { SxProps, Theme, alpha } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  card: {
    // background: alpha(theme.palette.primary.light, 0.5),
    // padding: theme.spacing(8, 0, 6),
    my: 2,
    p: 4,
    borderBottom: "1px solid white",
    display: "flex",
    flexDirection: "column",
  },

  button: {
    mt: 2,
    width: "50%",
    alignSelf: "center",
  },
});
