import React, { useState } from 'react';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState('');

  const login = (newUser, newJwt) => {
    setUser(newUser);
    setJwt(newJwt);
    sessionStorage.setItem('jwt', newJwt);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setJwt('');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
