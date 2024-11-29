import datetime
# GPT Code composed Bellow
def summarize_stock_data(data):
    """
    Summarizes stock market data the given time interval.

    Args:
        data (dict): JSON data containing stock results.

    Returns:
        dict: Summary of stock metrics.
    """
    results = data["results"]

    # Initialize variables for calculations
    highest_price = float('-inf')
    lowest_price = float('inf')
    total_volume = 0
    total_trades = 0
    sum_average_price = 0
    sum_open_price = 0
    sum_close_price = 0
    days_count = len(results)

    # Loop through each day's data
    for day in results:
        highest_price = max(highest_price, day["h"])
        lowest_price = min(lowest_price, day["l"])
        total_volume += day["v"]
        total_trades += day["n"]
        sum_average_price += day["vw"]
        sum_open_price += day["o"]
        sum_close_price += day["c"]

    # Calculate averages
    average_price = sum_average_price / days_count
    average_open_price = sum_open_price / days_count
    average_close_price = sum_close_price / days_count
    average_volume = total_volume / days_count
    average_trades = total_trades / days_count

    # Convert timestamps to readable dates
    readable_dates = [datetime.datetime.fromtimestamp(day["t"] / 1000).strftime("%Y-%m-%d") for day in results]

    # Summary dictionary
    summary = {
        "ticker": data["ticker"],
        "week_high": highest_price,
        "week_low": lowest_price,
        "average_price": round(average_price, 2),
        "average_open_price": round(average_open_price, 2),
        "average_close_price": round(average_close_price, 2),
        "total_volume_traded": int(total_volume),
        "average_volume": round(average_volume, 2),
        "total_trades": int(total_trades),
        "average_trades_per_day": round(average_trades, 2),
        "date_range": f"{readable_dates[0]} to {readable_dates[-1]}"
    }

    return summary
