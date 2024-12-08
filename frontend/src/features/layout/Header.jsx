import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box textAlign="left" mt={4} marginBottom={4}>
      {/* Header Title */}
      <Typography variant="h4" component="h1" fontWeight="bold" color="black">
        {title}
      </Typography>
      {/* Subtitle */}
      <Typography variant="subtitle1" component="p" color="gray">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
