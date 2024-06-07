import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  button: {
    display: "flex",
    flexDirection: "row",
    color: "inherit",
  },
});
