import React, { useState } from "react";
import {
  Box, Typography, Button,
  Grid2 as Grid, Container,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Header } from "../../layout";

import { removeStrategy, getStrategies } from '../utils';

const ViewStrategy = () => {
  const [strategies, setStrategies] = useState(getStrategies());

  const handleDelete = (id) => {
    removeStrategy(id);
    setStrategies(getStrategies());
  };

  const renderAddStrategyBtn = () => {
    return (
      <Link to="/strategy/add">
        <Button variant="outlined" color="white">
          Add Strategy
        </Button>
      </Link>
    );
  };

  const renderHeader = () => {
    return (
      <Grid 
        container 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={2} // optional, adds space between items
      >
        <Grid item>
          <Header title="Strategies" subtitle="Add/View strategies for your portfolio" />
        </Grid>
        <Grid item>
          {renderAddStrategyBtn()}
        </Grid>
      </Grid>
    );
  };

  const renderStrategies = () => {
    return (
      <Box mt={2}>
        {strategies.map(strategy => (
          <Box
            key={strategy.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography variant="subtitle1">{strategy.title} ({strategy.id})</Typography>
              <Typography variant="body2">{strategy.body}</Typography>
            </Box>
            <Button color="error" variant="contained" onClick={() => handleDelete(strategy.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Container>
      {renderHeader()}
      {
        strategies && strategies.length > 0 ? (
          renderStrategies()
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <h1>No strategies found!</h1>
          </Box>
        )
      }
    </Container>
  );
};

export default ViewStrategy;
