import { SxProps, Theme, alpha } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },
});
