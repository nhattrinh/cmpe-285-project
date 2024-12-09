from fastapi import APIRouter, HTTPException, Query

strategies_router = APIRouter()

strategy_to_stocks = {
    "Ethical Investing": ["TSLA", "BYND", "FSLR"],
    "Growth Investing": ["NVDA", "MSFT", "AMZN"],
    "Index Investing": ["VOO", "SCHF", "SPY"],
    "Quality Investing": ["AAPL", "GOOGL", "MSFT"],
    "Value Investing": ["BRK.B", "JNJ", "VZ"]
}

strategy_to_percentage = {
    "Ethical Investing": [0.3, 0.3, 0.4],
    "Growth Investing": [0.5, 0.3, 0.2],
    "Index Investing": [0.4, 0.3, 0.3],
    "Quality Investing": [0.4, 0.3, 0.3],
    "Value Investing": [0.4, 0.3, 0.3]
}

# Get list of stocks name by strategy name
@strategies_router.get("/strategies/{strategy_name}")
async def get_stocks_by_strategy(strategy_name: str):
    return strategy_to_stocks[strategy_name]

# Get all strategies
@strategies_router.get("/strategies")
async def get_strategies():
    return list(strategy_to_stocks.keys())

# Get percentage of each stock to buy by strategy name
@strategies_router.get("/strategies/percentage/{strategy_name}")
async def get_percentage_by_strategy(strategy_name: str):
    return strategy_to_percentage[strategy_name]
