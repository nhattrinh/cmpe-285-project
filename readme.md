
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
  - Requests: For fetching live data.
  - FastAPI: for sending the api requests and process frontend requests.

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

### Prerequisites
- Python 3.9+
- Node.js 16+ and npm
- Polygon.io API Key
- Git

### Backend Setup (FastAPI)
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/stock-portfolio-suggestion-engine.git
   cd stock-portfolio-suggestion-engine/backend
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Python Dependencies**
   ```bash
   pip install fastapi uvicorn python-dotenv
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the backend directory in the Backend/app/ directory:
   ```
   POLYGON_API_KEY=your_polygon_api_key_here
   ```

5. **Run the FastAPI Server**
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup (React)
1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Node Dependencies**
   ```bash
   npm install
   ```

3. **Install Additional Packages**
   ```bash
   npm install axios recharts react-router-dom @mui/material @emotion/react
   ```

4. **Run the React Development Server**
   ```bash
   npm start
   ```

### Recommended Development Tools
- Backend: VSCode with Python extension
- Frontend: VSCode with ES7+ React extension
- Postman for API testing
- Docker Desktop for containerization
