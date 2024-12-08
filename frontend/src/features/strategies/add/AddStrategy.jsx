import React from "react";
import {
  Box, Typography, Select,
  MenuItem, Button
} from "@mui/material";

import { Header } from "../../layout";

const AddStrategy = () => {
  const renderTypeSelect = () => {
    return (
      <Box marginBottom={4}>
        <Typography variant="subtitle1" gutterBottom>
          Type
        </Typography>
        <Select
          value="Ethical Investing"
          fullWidth
        >
          <MenuItem value="Ethical Investing">Ethical Investing</MenuItem>
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
        <Button variant="outlined" type="button" color="white">Add</Button>
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
