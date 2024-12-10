import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Container, 
  Paper, 
  TableContainer
} from '@mui/material';

import { getStrategies } from '../strategies/utils';

// Custom TabPanel component to render content
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Vertical Tabs Component
const DynamicVerticalTabs = () => {
  const [value, setValue] = useState(0);
  const [strategies, setStrategies] = useState(getStrategies());


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return (
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ 
          borderRight: 1, 
          borderColor: 'divider', 
          width: "auto"
        }}
      >
        {strategies.map((strategy, index) => (
          <Tab 
            key={index} 
            label={`${strategy.title} (${strategy.id})`}
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    );
  };

  const renderTabPanel = () => {
    return strategies && strategies.length >= 0 && (
      strategies.map((strategy, index) => (
        <TabPanel key={index} value={value} index={index}>
          {strategy.stocks.map((stock, index) => (
            <Typography key={index} variant="body1">
              {stock.ticker} - {stock.description}
            </Typography>
          ))}
        </TabPanel>
      ))
    );
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Paper
        elevation={1}
        sx={{ display: 'flex', height: 400 }}
      >
        {renderTabs()}
        {renderTabPanel()}
      </Paper>
    </Container>
  );
};

export default DynamicVerticalTabs;
