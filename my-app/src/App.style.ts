import { CardContent, CardMedia } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  container: {
    background: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    mr: 2,
  },
  buttons: {
    mt: 4,
  },
  cardGrid: {
    p: "2 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    pt: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});
