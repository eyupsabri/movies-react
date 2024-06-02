import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  cardMedia: {
    // pt: "100%", // 16:9
    height: 400,
    objectFit: "contain",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});
