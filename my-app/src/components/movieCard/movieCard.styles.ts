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
    position: "relative",
  },
  cardContent: {
    flexGrow: 1,
  },
  onMouseOver: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 5,
    borderColor: "green",
  },
});
