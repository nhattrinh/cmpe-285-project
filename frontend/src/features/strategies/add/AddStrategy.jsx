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
        setSelectedStrategyStocks(res.data);
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
        <Box>
          <Typography variant="body1">Apple (AAPL)</Typography>
          <Typography variant="body2">
            Apple is one of the leaders of hardware and chip manufacturing. Apple is headquartered in Cupertino, California.
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Adobe (ADBE)</Typography>
          <Typography variant="body2">
            Adobe is the leader of the creative space for artists and designers alike. Adobe is headquartered in San Jose, California.
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Nestlé (NSRGY)</Typography>
          <Typography variant="body2">
            Nestlé is a Swiss multinational food and drink processing conglomerate corporation headquartered in Vevey, Switzerland.
          </Typography>
        </Box>
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
