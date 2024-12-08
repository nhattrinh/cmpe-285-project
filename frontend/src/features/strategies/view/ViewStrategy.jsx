import React, { useState } from 'react';
import {
  Box, Typography, Button,
  Grid2 as Grid,
} from '@mui/material';

import { Header } from "../../layout";

const ViewStrategy = () => {
  const [strategies, setStrategies] = useState([
    {
      id: '2msz',
      title: 'Ethical Investing Strategy',
      body: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    },
    {
      id: 'dk2d',
      title: 'Index Investing Strategy',
      body: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    },
    {
      id: '92mx',
      title: 'Value Investing Strategy',
      body: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.'
    }
  ]);

  const handleDelete = (id) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
  };

  const renderAddStrategyBtn = () => {
    return (
      <Button variant="outlined" color="white">Add Strategy</Button>
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
    <Box>
      {renderHeader()}
      {renderStrategies()}
    </Box>
  );
};

export default ViewStrategy;
