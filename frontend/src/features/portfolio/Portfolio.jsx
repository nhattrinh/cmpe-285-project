import React, { useState } from 'react';
import {
  Box, Typography, Button,
  Select, MenuItem, FormControl,
  InputLabel, Grid2 as Grid
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Portfolio = () => {
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

  const [timeframe, setTimeframe] = useState('5 Days');

  
  const data = [
    { name: 'Day 1', value: 100 },
    { name: 'Day 2', value: 95 },
    { name: 'Day 3', value: 90 },
    { name: 'Day 4', value: 85 },
    { name: 'Day 5', value: 80 },
  ];

  const renderGraph = () => {
    return (
      <LineChart width={600} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const renderHeader = () => {
    return (
      <Box textAlign="left" mt={4} marginBottom={4}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">Portfolio</Typography>
            <Typography variant="body1">Current values and weekly trend of all of your stocks</Typography>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
              <Select
                labelId="timeframe-select-label"
                id="timeframe-select"
                value={timeframe}
                onChange={handleTimeframeChange}
                label="Timeframe"
                variant="outlined"
              >
                <MenuItem value="5 Days">5 Days</MenuItem>
                <MenuItem value="1 Month">1 Month</MenuItem>
                <MenuItem value="3 Months">3 Months</MenuItem>
                <MenuItem value="1 Year">1 Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
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
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {renderHeader()}
      {renderGraph()}
      {renderStrategies()}
    </Box>
  );
};

export default Portfolio;
