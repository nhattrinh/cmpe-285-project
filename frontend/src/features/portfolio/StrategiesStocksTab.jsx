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
const DynamicVerticalTabs = ({
  stockToPrice, stockToSharesPurchased
}) => {
  const [value, setValue] = useState(0);
  const [strategies, _] = useState(getStrategies());


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
      strategies.map((strategy, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <Typography variant="h5">
              ${strategy.amountInvested} invested.
            </Typography>
            {strategy.stocks.map((stock, index) => (
              <Box
                key={stock.ticker}
                border="solid 0.5px lightgray"
                borderRadius={1}
                margin={"1em 0"}
                padding={1}
              >
                <Typography key={index} variant="h6">
                  {stock.ticker}
                </Typography>
                <Box>
                  {
                    stockToPrice
                    && Object.keys(stockToPrice).length > 0
                    && stockToPrice[stock.ticker]
                    && (
                      <Typography variant="body1">
                        ${stockToPrice[stock.ticker][stockToPrice[stock.ticker].length - 1]} currently.
                      </Typography>
                    )
                  }
                  {
                    stockToPrice
                    && Object.keys(stockToPrice).length > 0
                    && stockToPrice[stock.ticker]
                    && (
                      <Typography variant="body1">
                        {stockToSharesPurchased[stock.ticker].toFixed(2)} shares purchased.
                      </Typography>
                    )
                  }
                </Box>
              </Box>
            ))}
          </TabPanel>
        );
      })
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
