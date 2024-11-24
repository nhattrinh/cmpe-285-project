import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { AuthContext } from '../auth';

const Navbar = ({ title }) => {
  const { user } = useContext(AuthContext);

  const renderWhenLoggedIn = () => {
    return user && (
      <>
        <Link to="/logout" style={{ color: 'white', textDecoration: 'none', marginLeft: '15px' }}>
          Logout
        </Link>
      </>
    );
  };

  const renderWhenLoggedOut = () => {
    return !user && (
      <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>
        Sign In
      </Link>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {title}
          </Link>
        </Typography>
        {renderWhenLoggedIn()}
        {renderWhenLoggedOut()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
