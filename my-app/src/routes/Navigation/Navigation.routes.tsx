import { Typography, AppBar, CssBaseline, Toolbar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useStyles } from "./Navigation.styles";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PhotoCamera sx={classes.icon} />
          <Typography variant="h6">Photo Album</Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* <Box sx={classes.container}>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Photo Album
            </Typography>
            <Typography
              variant="h4"
              align="center"
              color="textSecondary"
              paragraph
            >
              Hello everyone this is a photo album i am trying to make this
              sentecnce as long as possible lets see how it looks
            </Typography>
            <Box sx={classes.buttons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    See my photos
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Movies /> */}
        <Outlet />
      </main>
      <footer
        style={{
          backgroundColor: theme.palette.background.paper,
          padding: "50px 0",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </>
  );
};

export default Navigation;
