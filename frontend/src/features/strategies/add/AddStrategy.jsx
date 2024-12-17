import React, { useState, useEffect } from "react";
import {
  Box, Typography, Select,
  MenuItem, Button, InputAdornment,
  TextField, Alert, AlertTitle,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Header } from "../../layout";

import { addStrategy } from "../utils";
import api from "../../api.config";

const AddStrategy = () => {
  const navigate = useNavigate();
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedStrategyStocks, setSelectedStrategyStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amountInvested, setAmountInvested] = useState(null);
  const [amount, setAmount] = useState("");
  const [inputIsErrored, setInputIsErrored] = useState(false);
  const [stockToPercentage, setStockToPercentage] = useState({});

  useEffect(() => {
    setIsLoading(true);
    api.getStrategies()
      .then((res) => {
        setStrategies(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedStrategy) {
      setIsLoading(true);
      api.getStrategyStocks(selectedStrategy)
        .then((res) => {
          const stocks = [];
          for (const ticker of res.data) {
            stocks.push({ ticker, description: "" });
          }
          setSelectedStrategyStocks(stocks);
          api.getPercentageByStrategy(selectedStrategy)
            .then((res) => {
              let finalStockToPercentage = {};
              stocks.forEach((stock, index) => {
                finalStockToPercentage = {
                  ...finalStockToPercentage,
                  [stock.ticker]: res.data[index],
                };
              });
              setStockToPercentage(finalStockToPercentage);
              setIsLoading(false);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
      }
  }, [selectedStrategy]);

  const renderTypeSelect = () => {
    return strategies && strategies.length >= 0 && (
      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          Type
        </Typography>
        <Select
          value={selectedStrategy}
          fullWidth
          onChange={({ target }) => setSelectedStrategy(target.value)}
        >
          {
            strategies && strategies.length > 0 && (
              strategies.map((strategy) => (
                <MenuItem key={strategy} value={strategy}>
                  {strategy}
                </MenuItem>
              ))
            )
          }
        </Select>
      </Box>
    );
  };

  const renderMappedStocks = () => {
    return selectedStrategy && (
      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          Mapped Stocks
        </Typography>
        {
          selectedStrategyStocks && selectedStrategyStocks.length > 0 && (
            selectedStrategyStocks.map((stock) => (
            <Box
              key={stock.ticker}
              border="solid 0.5px lightgray"
              borderRadius={1}
              margin={"1em 0"}
              padding={1}
            >
              <Typography variant="subtitle1">
                {stock.ticker}
              </Typography>
              <Typography variant="body2">
                {stock.description}
              </Typography>
              <Typography variant="body2">
                ${stockToPercentage[stock.ticker] * amountInvested} invested.
              </Typography>
              <Typography variant="body2">
                {stockToPercentage[stock.ticker] * 100}% of portfolio.
              </Typography>
            </Box>
          ))
        )}
      </Box>
    );
  };

  const renderAmountInvestedInput = () => {
    const handleChange = (event) => {
      const value = event.target.value;
      // Validate input to allow only numbers
      if (!isNaN(value) && value >= 0) {
        setAmountInvested(value);
      }
    };

    return (
      <Box marginBottom={4}>
        <Typography variant="h6" gutterBottom>
          Amount Invested
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={amountInvested}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          type="number"
          inputProps={{
            min: 0,
            step: "50", // Allows decimals
          }}
        />
      </Box>
    );
  };

  const handleAddClick = () => {
    if (!amountInvested || !selectedStrategy) {
      setInputIsErrored(true);
      return;
    }

    addStrategy(
      selectedStrategy,
      selectedStrategyStocks,
      parseInt(amountInvested),
      stockToPercentage,
    );
    navigate("/strategy/view");
  };

  const renderAddBtn = () => {
    return (
      <Box textAlign="left">
        <Button
          variant="outlined"
          type="button"
          color="white"
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>
    );
  };

  const renderInputErrorBanner = () => {
    return inputIsErrored && (
      <Alert severity="error" sx={{ mb: 2 }}>
        <AlertTitle>Error</AlertTitle>
        Please fill out all inputs before continuing.
      </Alert>
    );
  };

  return (
    <Container sx={{ paddingBottom: 4 }}>
      <Header title="Add Strategy" subtitle="Append stocks to your profile" />
      {renderInputErrorBanner()}
      {renderAmountInvestedInput()}
      {renderTypeSelect()}
      {renderMappedStocks()}
      {renderAddBtn()}
    </Container>
  );
};

export default AddStrategy;
