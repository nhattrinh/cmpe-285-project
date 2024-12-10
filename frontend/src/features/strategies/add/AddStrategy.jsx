import React, { useState, useEffect } from "react";
import {
  Box, Typography, Select,
  MenuItem, Button, Card,
  CardContent, Grid2,
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
  const [amountInvested, setAmountInvested] = useState(0);

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
          setIsLoading(false);
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
        <Typography variant="h5" gutterBottom>
          Type
        </Typography>
        <Select
          value={selectedStrategy}
          fullWidth
          onChange={({ target }) => setSelectedStrategy(target.value)}
        >
          {
            strategies.map((strategy) => (
              <MenuItem key={strategy} value={strategy}>
                {strategy}
              </MenuItem>
            ))
          }
        </Select>
      </Box>
    );
  };

  const renderMappedStocks = () => {
    return selectedStrategy && (
      <Box marginBottom={4}>
        <Typography variant="h5" gutterBottom>
          Mapped Stocks
        </Typography>
        {
          selectedStrategyStocks.map((stock) => (
            <Box
              key={stock.ticker}
              border="solid 0.5px grey"
              borderRadius={2}
              margin={"1em 0"}
              padding={1}
            >
              <Typography variant="h6">{stock.ticker}</Typography>
              <Typography variant="body2">{stock.description}</Typography>
            </Box>
          ))
        }
      </Box>
    );
  };

  const renderAmountInvestedInput = () => {
    return (
      <Box marginBottom={4}>
        <Typography variant="h5" gutterBottom>
          Amount Invested
        </Typography>
        <input
          type="number"
          value={amountInvested}
          onChange={({ target }) => setAmountInvested(target.value)}
        />
      </Box>
    );
  };

  const renderAddBtn = () => {
    return (
      <Box textAlign="left">
        <Button
          variant="outlined"
          type="button"
          color="white"
          onClick={() => {
              addStrategy(selectedStrategy, selectedStrategyStocks);
              navigate("/strategy/view");
            }
          }
        >
          Add
        </Button>
      </Box>
    );
  };

  return (
    <Box paddingBottom={4}>
      <Header title="Add Strategy" subtitle="Append stocks to your profile" />
      {renderTypeSelect()}
      {renderMappedStocks()}
      {renderAddBtn()}
    </Box>
  );
};

export default AddStrategy;
