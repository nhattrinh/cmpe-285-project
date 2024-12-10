import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button,
  Select, MenuItem, FormControl,
  InputLabel, Grid2 as Grid
} from '@mui/material';

import StrategiesStocksTab from "./StrategiesStocksTab";
import StocksValueGraph from "./StocksValueGraph";

import { getStrategies } from "../strategies/utils";
import { getFromToDates } from "./utils";
import api from "../api.config";

const Portfolio = () => {
  const [strategies, setStrategies] = useState(getStrategies());
  const [timeframe, setTimeframe] = useState("5 Days");
  const [stockToPrice, setStockToPrice] = useState({});

  useEffect(() => {
    if (!stockToPrice) {
      strategies.forEach((strategy) => {
        api.getTimeFrame
    }
  }, []);

  const renderGraph = () => <StocksValueGraph />;

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
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderStrategies = () => <StrategiesStocksTab />;

  return (
    <Box>
      {renderHeader()}
      <Box display="flex" alignItems="center" flexDirection="column">
        {renderGraph()}
        {renderStrategies()}
      </Box>
    </Box>
  );
};

export default Portfolio;
