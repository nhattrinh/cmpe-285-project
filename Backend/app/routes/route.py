from fastapi import APIRouter, HTTPException
import requests
from app.config import Config

api_router = APIRouter()

@api_router.get("/market/status")
async def get_market_status():
    """
    Get the current market status (e.g., open/closed).
    """
    url = "https://api.polygon.io/v1/marketstatus/now"
    params = {"apiKey": Config.POLYGON_API_KEY}
    
    print(url, params)
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()


@api_router.get("/stock/{ticker}/details")
async def get_stock_details(ticker: str):
    """
    Get details for a specific stock ticker.
    """
    url = f"https://api.polygon.io/v3/reference/tickers/{ticker}"
    params = {"apiKey": Config.POLYGON_API_KEY}
    
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()




# This will return the stock price of the most recent days
@api_router.get("/stock/{ticker}/previous")
async def get_previous_day_details(ticker: str): 
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/prev?adjusted=true"
    params = {"apiKey": Config.POLYGON_API_KEY}

    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()


# Gives you the stock prices of a specified day and night

# @api_router.get("/stock/{ticker}/aggs")
# async def get_range_day_details(ticker:str): 

    