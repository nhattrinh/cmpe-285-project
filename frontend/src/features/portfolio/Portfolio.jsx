import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Container,
  Select, MenuItem, FormControl,
  InputLabel, Grid2 as Grid,
  LinearProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

import StrategiesStocksTab from "./StrategiesStocksTab";
import StocksValueGraph from "./StocksValueGraph";

import { getStrategies } from "../strategies/utils";
import { getFromToDates } from "./utils";
import api from "../api.config";

const Portfolio = () => {
  const [strategies, setStrategies] = useState(getStrategies());
  const [timeframe, setTimeframe] = useState("5 Days");
  const [stockToPrice, setStockToPrice] = useState({});
  const [stockToSharesPurchased , setStockToSharesPurchased] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const { from, to } = getFromToDates();
    let finalStockToPrice = {...stockToPrice};
    let finalStockToSharesPurchased = {...stockToSharesPurchased};
    let finalPortfolioValueArr = [0, 0, 0, 0, 0];
    setIsLoading(true);

    const getPortfolioData = async () => {
      for (const strategy of strategies) {
        const {
          stocks, amountInvested, stockToPercentage,
        } = strategy;

        for (const stock of stocks) {
          try {
            const response = await api.getTimeFrame(stock.ticker, from, to)
            const { results } = response.data;
            // Get the closing prices for the past 5 days
            const pastFiveDays = results.map((result) => result.c);
            finalStockToPrice[stock.ticker] = pastFiveDays;
            // Calculate the amount of shares purchased
            finalStockToSharesPurchased[stock.ticker] = amountInvested * stockToPercentage[stock.ticker] / pastFiveDays[pastFiveDays.length - 1];

            // Calculate portfolio value for each day
            for (let i = 0; i < pastFiveDays.length; i++) {
              finalPortfolioValueArr[i] += pastFiveDays[i] * finalStockToSharesPurchased[stock.ticker];
            }
          } catch(err) {
            console.error(err);
          }
        }
      }

      // Process graph data
      const finalData = [];
      // Set the name as current day's full date and value as the portfolio value
      finalPortfolioValueArr.forEach((value, index) => {
        const finalValue = value.toFixed(2);
        const date = new Date();
        date.setDate(date.getDate() - (finalPortfolioValueArr.length - index - 1));
        const name = date.toDateString().split(" ").slice(1, 3).join(" ");
        finalData.push({ name, value: parseFloat(finalValue) });
      });

      setGraphData("finalData");
      setStockToPrice("finalStockToPrice");
      setStockToSharesPurchased("finalStockToSharesPurchased");
      setIsLoading(false);
    }

    getPortfolioData();
  }, []);

  const renderGraph = () => graphData && graphData.length > 0 && (
    <StocksValueGraph
      graphData={graphData}
    />
  );

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

  const renderStrategies = () => (
    <StrategiesStocksTab
      stockToPrice={stockToPrice}
      stockToSharesPurchased={stockToSharesPurchased}
    />
  );

  if (isLoading) {
    return (
      <div
      style={{
        width: '100vw',
        height: '50em',
        marginBottom: '4em',
      }}
      >
        <LinearProgress
          sx={{
            backgroundColor: 'lightgray', // Background color of the bar
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'black', // Color of the progress bar
            },
          }}
        />
      </div>
    );
  }

  if (strategies && strategies.length > 0) {
    return (
      <Container>
        {renderHeader()}
        <Box display="flex" alignItems="center" flexDirection="column">
          {renderGraph()}
          {renderStrategies()}
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <h1>No strategies found!</h1>
        <br />
        <Link to="/strategy/add"><h3>Add a strategy now!</h3></Link>
      </Box>
    </Container>
  );
};

export default Portfolio;
