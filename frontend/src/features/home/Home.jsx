import React from "react";
import { Grid2 as Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import BackgroundImage from "./assets/background.jpg";

const Home = () => {
  const styles = {
      backgroundImage: `url(${BackgroundImage})`, // Replace with your image path
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh", // Sets height to full viewport
      margin: 0,
      padding: 0,
      marginTop: "-0.1em",
      paddingLeft: "1.5em",
      display: "flex",
      alignItems: "center",
  };

  return (
      <div style={styles}>
          <Grid container>
            <Grid item size={12}>
              <h1>Ready to Start Your Financial Independence Today?</h1>
            </Grid>
            <Grid item size={2}>
              <Link to="/strategy/view">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                >
                  View Strategies
                </Button>
              </Link>
            </Grid>
            <Grid item size={2}>
              <Link to="/portfolio">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                >
                  Portfolio
                </Button>
              </Link>
            </Grid>
          </Grid>
      </div>
  );
};

export default Home;
