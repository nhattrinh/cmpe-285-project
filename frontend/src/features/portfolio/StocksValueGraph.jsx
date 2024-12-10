import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis,
  YAxis, CartesianGrid, Tooltip,
  Legend,
} from "recharts";

const StocksValueGraph = () => {
  const data = [
    { name: 'Day 1', value: 100 },
    { name: 'Day 2', value: 95 },
    { name: 'Day 3', value: 90 },
    { name: 'Day 4', value: 85 },
    { name: 'Day 5', value: 80 },
  ];

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

  return (
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
