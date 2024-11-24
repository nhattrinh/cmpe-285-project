import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout]);

  return null;
};

export default Logout;
