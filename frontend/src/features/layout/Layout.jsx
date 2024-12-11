import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar title="Stocks Recommendation Engine" />
      <Outlet />
    </>
  );
};

export default Layout;
