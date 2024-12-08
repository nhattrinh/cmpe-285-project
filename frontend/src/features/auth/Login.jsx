import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext'
import { BACKEND_URL } from '../constants';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/login`,
        { email, password }
      );
      const { data } = response;
      const { jwt, user } = data;
      login(user, jwt);
      navigate('/upload');
    } catch (err) {
      console.error(err);
      const { response } = err;
      if (response) {
        const { data } = response;
        const { msg } = data;
        return alert(msg);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: '50%'
        }}
      >
        <TextField label="Email" type="email" onChange={({ target }) => setEmail(target.value)} required />
        <TextField label="Password" type="password" onChange={({ target }) => setPassword(target.value)} required />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
