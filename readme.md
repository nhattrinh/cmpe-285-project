
# Stock Portfolio Suggestion Engine  

## 📈 Overview  
The **Stock Portfolio Suggestion Engine** is a Python-based application designed to help users allocate their investment funds effectively based on selected strategies. Users can input a dollar amount (minimum $5000 USD), choose investment strategies, and receive recommendations for stocks or ETFs. The engine tracks the performance of the portfolio and provides insights like current value and weekly trends.

---

## 🚀 Features  
1. **Investment Strategies**:  
   - Ethical Investing  
   - Growth Investing  
   - Index Investing  
   - Quality Investing  
   - Value Investing  

2. **Portfolio Suggestions**:  
   - Assigns stocks or ETFs based on selected strategies.  
   - At least 3 stocks/ETFs mapped per strategy.  

3. **Dynamic Portfolio Updates**:  
   - Real-time updates on the portfolio's value using live stock data via APIs.  

4. **Trend Analysis**:  
   - Tracks the weekly trend (last 5 days) of portfolio value.  

5. **Interactive Interface**:  
   - User-friendly UI for inputting details and visualizing results.  

6. **Additional Features**:  
   - Custom strategy combinations.  
   - Visual charts for portfolio composition and trends.  

---

## 🛠️ Technologies Used  
- **Python**: Core language for the engine.  
- **APIs**: Fetch live stock data (e.g., Yahoo Finance API, Alpha Vantage).  
- **Libraries**:  
  - Pandas: For data manipulation.  
  - Matplotlib/Plotly: For visualization.  
  - Requests: For fetching live data.  
  - Numpy: For calculations.  
  - Flask/Streamlit: For building the UI.  

---

## 📋 How It Works  
1. **Input**:  
   - User inputs the dollar amount to invest (min. $5000 USD).  
   - User selects one or two investment strategies.  

2. **Portfolio Assignment**:  
   - Based on selected strategies, the engine suggests stocks/ETFs.  
   - Allocates the investment amount proportionally across the suggestions.  

3. **Live Updates**:  
   - Retrieves current stock prices via an API.  
   - Calculates the total portfolio value in real-time.  

4. **Weekly Trends**:  
   - Tracks portfolio value for the past 5 days and displays a line chart.  

---

## 📄 Output  
- **Stock/ETF Suggestions**: List of assigned stocks/ETFs based on strategies.  
- **Allocation Breakdown**: How the inputted amount is distributed among suggestions.  
- **Real-Time Portfolio Value**: Total portfolio worth updated with live data.  
- **Weekly Trend Chart**: Visualization of portfolio performance over the last 5 days.  

---

## 🖥️ Setup Instructions  

### **Prerequisites**  
- Python 3.8+  
- Install required libraries:  
  ```bash
  pip install pandas matplotlib requests flask alpha_vantage
