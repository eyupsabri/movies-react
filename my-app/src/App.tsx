import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  AppBar,
  Card,
  CardActions,
  CssBaseline,
  Toolbar,
  Grid,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useStyles } from "./App.style";
import { useTheme } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
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
        <Box sx={classes.container}>
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
        <Container sx={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={classes.card}>
                  <CardMedia
                    sx={classes.cardMedia}
                    image="https://picsum.photos/300/200"
                  />
                  <CardContent sx={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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
}

export default App;
