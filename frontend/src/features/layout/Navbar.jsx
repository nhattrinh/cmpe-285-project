import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {title}
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
