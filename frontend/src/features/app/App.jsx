import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from '../layout';
import Home from '../home';
import AddStrategy from '../strategies/add';
import ViewStrategy from '../strategies/view';
import Portfolio from '../portfolio';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/strategy',
        children: [
          {
            path: 'add',
            element: <AddStrategy />,
          },
          {
            path: 'view',
            element: <ViewStrategy />,
          }
        ]
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      }
    ],
  },
]);


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
