import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {title}
          </Link>
        </Typography>

        {/* Right side: Buttons */}
        <Box>
            <Button
                component={Link}
                to="/strategy/view"
                sx={{ color: 'white', textTransform: 'none' }}
            >
                View Strategy
            </Button>
            <Button
                component={Link}
                to="/strategy/add"
                sx={{ color: 'white', textTransform: 'none' }}
            >
                Add Strategy
            </Button>
            <Button
                component={Link}
                to="/portfolio"
                sx={{ color: 'white', textTransform: 'none' }}
            >
                Portfolio
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
