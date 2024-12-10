from fastapi import APIRouter, HTTPException, Body
import requests
from app.config import Config
from app.utils import summarize_stock_data
api_router = APIRouter()



# The endpoint that will give us the afterhours, crypto market, and overall market status. 
# Will determin if our entire market application is still open, or if its closed
# Endpoint http://127.0.0.1:8000/api/market/status
@api_router.get("/market/status")
async def get_market_status():
    """
    Get the current market status (e.g., open/closed).
    """
    url = "https://api.polygon.io/v1/marketstatus/now"
    params = {"apiKey": Config.POLYGON_API_KEY}
    
    # print(url, params)
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()


# *********************************************************************************
# Gives the Description of the company
# Ticker represents the Symbol that the stock is regestered within the stock market
# THIS ONLY RETURNS THE INFORMATION OF THE COMPANY, AND NOT THE STOCK PRICES
# 
# Bellow is the code that will return the ticker, address, city, state, postal_code, description, share_class, and weight
# Sample Endpoint  http://127.0.0.1:8000/api/stock/ADBE/details
# ********************************************************************************

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
    
    data = response.json()
    # print(data)
    stock_data = {
        "ticker": data["results"].get("ticker", "N/A"),
        "address": data["results"].get("address", "N/A"),
        "description": data["results"].get("description", "N/A"),
        "share_class_shares_outstanding": data["results"].get("share_class_shares_outstanding", "N/A"),
        "weighted_shares_outstanding": data["results"].get("weighted_shares_outstanding", "N/A"),
        "round_lot": data["results"].get("round_lot", "N/A")
    }
    return stock_data 




# ******************************************************************************* 
#  Get the previous day's open, high, low, and close (OHLC) for the specified stock ticker.
#   c-> close price, h -> highest price, l -> low price, n -> number of transactions, v -> trading volume
#   vw -> volume weighted average, 
# ****************************************************************************
@api_router.get("/stock/{ticker}/previous")
async def get_previous_day_details(ticker: str): 
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/prev?adjusted=true"
    params = {"apiKey": Config.POLYGON_API_KEY}

    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()

# GPT Code composed bellow 
# ***************************************************************** 
# Check the Aggregates (Bars) section of https://polygon.io/docs/stocks/getting-started
"""
    {
    "ticker": "ADBE",
    "week_high": 365.87,
    "week_low": 333.47,
    "average_price": 345.51,
    "average_open_price": 342.99,
    "average_close_price": 346.21,
    "total_volume_traded": 25248387,
    "average_volume": 2524838.7,
    "total_trades": 572591,
    "average_trades_per_day": 57259.1,
    "date_range": "2023-01-08 to 2023-01-22"
}
"""
# Using the passed in body paratmters, mulipier, timespane, to, adjust...... as the json body 
# Using the summarize_stock_data of the utils.py. 
#  Sample Enpoints we need to enter is http://127.0.0.1:8000/api/stock/ADBE/details
# ************************************************************************
@api_router.post("/stock/{ticker}/customWindow")
async def get_timeframe(ticker: str, 
                                    payload: dict = Body(...)):
    """
    Get stock details for a custom window based on parameters passed in the JSON body.
    """   
    # Extract parameters from the JSON body
    multiplier = payload.get("multiplier", 1)
    timespan = payload.get("timespan", "day")
    from_date = payload.get("from", None)
    to_date = payload.get("to", None)
    adjusted = payload.get("adjusted", True) 
    sort = payload.get("sort", "asc") 
    limit = payload.get("limit", None)
    get_summary = payload.get("getSummary", False)    

    # Validate required parameters
    if not from_date or not to_date:
        raise HTTPException(status_code=400, detail="Both 'from' and 'to' dates are required.")

    # Construct the API URL
    url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from_date}/{to_date}"

    # Add query parameters
    params = {
        "adjusted": str(adjusted).lower(), 
        "sort": sort,
        "limit": limit,
        "apiKey": Config.POLYGON_API_KEY
    }

    params = {k: v for k, v in params.items() if v is not None}

    try:

        response = requests.get(url, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.json())

        if get_summary:
            response = summarize_stock_data(response.json())

        return response

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request to Polygon API failed: {str(e)}")
