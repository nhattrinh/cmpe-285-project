import axios from "axios";

const DEV_BASE_URL = "http://localhost:8000/api";
const PROD_BASE_URL = "http://52.90.228.157:8000/api";

const BASE_URL = process.env.NODE_ENV === "development" ? DEV_BASE_URL : PROD_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ({
  getStrategies: () => (
    api.get("/strategies")
  ),
  getStrategyStocks: (strategyName) => (
    api.get(`/strategies/${strategyName}`)
  ),
  getPercentageByStrategy: (strategyName) => (
    api.get(`/strategies/percentage/${strategyName}`)
  ),
  getStockDetails: (ticker) => (
    api.get(`/stock/${ticker}/details`)
  ),
  getTimeFrame: (ticker, from, to) => (
    api.post(
      `/stock/${ticker}/customWindow`,
      { from, to }
    )
  )
});
