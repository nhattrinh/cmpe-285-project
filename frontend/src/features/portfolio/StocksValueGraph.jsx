import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis,
  YAxis, CartesianGrid, Tooltip,
  Legend,
} from "recharts";

const StocksValueGraph = ({ portfolioValuesArr }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const finalData = [];
    // Set the name as current day's full date and value as the portfolio value
    portfolioValuesArr.forEach((value, index) => {
      const finalValue = value.toFixed(2);
      const date = new Date();
      date.setDate(date.getDate() - (portfolioValuesArr.length - index - 1));
      const name = date.toDateString().split(" ").slice(1, 3).join(" ");
      finalData.push({ name, value: finalValue });
    });
    setData(finalData);
  }, [portfolioValuesArr]);

  const [chartWidth, setChartWidth] = useState(
    window.innerWidth > 1104.05 ? 1104.05 : window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth > 1104.05 ? 1104.05 : window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return data && data.length > 0 && (
    <LineChart width={chartWidth} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default StocksValueGraph;
