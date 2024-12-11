import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import {
  LineChart, Line, XAxis,
  YAxis, CartesianGrid, Tooltip,
  Legend,
} from "recharts";

const StocksValueGraph = ({ graphData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([...graphData]);
    }, [graphData]);

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
