import finnhub
import json
from fastapi import APIRouter, HTTPException, Query
market_router = APIRouter()

# This API utilizes the Finnhub API, where it will utilize a websocket
# interface to access the top  10 trending news, and the most trending 
# Stocks. Read commends bellow to get the endpoints

# This only utilizes socket techonology, there will not be too much math
# involved, but it will satisfy one of the requirements


# This will give the top 10 news within the Finnhub
# URL enpoint http://127.0.0.1:8000/api/market
@market_router.get("/market")
async def get_news(): 
    """
    Get the current market news.
    """
    # Setup Finnhub client
    finnhub_client = finnhub.Client(api_key="ct4m9ipr01qo7vqaof6gct4m9ipr01qo7vqaof70")
    
    try:
        # Fetch general news, change the code if you would like more real-time news
        general_news = finnhub_client.general_news('general', min_id=0)[:10]
        
        return json.loads(json.dumps(general_news, indent=4))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


# Get latest analyst recommendation trends for a company.
#URL http://127.0.0.1:8000/api/trending?symbol=AAPL
@market_router.get("/trending", tags=["Market"])
async def get_trends(symbol: str = Query(..., description="Stock symbol to fetch recommendation trends for")): 
    """
    Get the trending recommendations for a specific stock symbol.
    """
    try:
        # Initialize Finnhub client
        finnhub_client = finnhub.Client(api_key="ct4m9ipr01qo7vqaof6gct4m9ipr01qo7vqaof70")

        # Fetch recommendation trends for the provided stock symbol
        trends = finnhub_client.recommendation_trends(symbol)

        if not trends:
            raise HTTPException(status_code=404, detail=f"No trends found for symbol: {symbol}")
        return trends

    except finnhub.FinnhubAPIException as e:
        raise HTTPException(status_code=500, detail=f"Finnhub API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")