import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  container: {
    background: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    mr: 2,
  },
});
