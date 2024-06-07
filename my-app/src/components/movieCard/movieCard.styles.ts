import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  cardGrid: {
    p: "2 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // pt: "100%", // 16:9
    height: 400,
    objectFit: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
});
