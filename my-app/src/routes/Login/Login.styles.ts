import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  icon_container: {
    bgcolor: "blueviolet",
    width: 90,
    height: 90,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
