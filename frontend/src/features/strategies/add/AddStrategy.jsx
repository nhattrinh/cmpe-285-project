import React, { useState, useEffect } from "react";
import {
  Box, Typography, Select,
  MenuItem, Button
} from "@mui/material";

import { Header } from "../../layout";

import { addStrategy } from "../utils";
import api from "../../api.config";

const AddStrategy = () => {
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedStrategyStocks, setSelectedStrategyStocks] = useState([]);

  useEffect(() => {
    api.getStrategies()
      .then((res) => {
        setStrategies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api.getStrategyStocks(selectedStrategy)
      .then((res) => {
        const stockDetailsPromises = res.data.map((ticker) => {
          return api.getStockDetails(ticker);
        });
        Promise.all(stockDetailsPromises)
          .then((stockDetails) => {
            setSelectedStrategyStocks(stockDetails.map((res) => res.data));
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
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
    return (
      <Box marginBottom={4}>
        <Typography variant="h5" gutterBottom>
          Mapped Stocks
        </Typography>
        {
          selectedStrategyStocks.map((stock) => (
            <Box key={stock.ticker}>
              <Typography variant="body1">{stock.ticker}</Typography>
              <Typography variant="body2">{stock.description}</Typography>
            </Box>
          ))
        }
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
          onClick={() => addStrategy()}
        >
          Add
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      <Header title="Add Strategy" subtitle="Append stocks to your profile" />
      {renderTypeSelect()}
      {renderMappedStocks()}
      {renderAddBtn()}
    </Box>
  );
};

export default AddStrategy;
