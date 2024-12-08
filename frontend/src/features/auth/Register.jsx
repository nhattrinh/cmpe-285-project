import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "placeholder";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    // Implement your registration logic here
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/register`,
        {
          firstName,
          lastName,
          email,
          password
        },
      );
      const { data } = response;
      const { user, jwt } = data;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
      navigate('/upload');
    } catch(err) {
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
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50%'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
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
        <TextField
          label="First Name"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
          required
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
      </Box>
  );
};

export default Register;
