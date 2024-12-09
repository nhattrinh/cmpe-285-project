
/**
 * Adds a strategy to localStorage to be displayed in the Portfolio page.
 * 
 * @param {String} strategyName - Strategy name (e.g. "Ethical Investing Strategy")
 * @param {Array} stocksArr - Array of stock symbols
 * belonging to the strategy (e.g. ["AAPL", "GOOGL", "TSLA"])
 */
export const addStrategy = (strategyName, stocksArr) => {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const id = Math.random().toString(36).substr(2, 4);
  strategies.push({
    id,
    title: strategyName,
    stocks: stocksArr
  });
  localStorage.setItem('strategies', JSON.stringify(strategies));
};

/**
 * Retrieves all strategies from localStorage.
 *  
 * @returns {Array} Array of strategies
 */
export const getStrategies = () => {
  return JSON.parse(localStorage.getItem('strategies')) || [];
};

/**
 * Removes a strategy from localStorage.
 *  
 * @param {String} id - Strategy ID
 */
export const removeStrategy = (id) => {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const updatedStrategies = strategies.filter(strategy => strategy.id !== id);
  localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
};
