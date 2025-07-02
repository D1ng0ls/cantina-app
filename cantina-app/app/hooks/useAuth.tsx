import { useContext } from 'react';
import { AuthContext } from '../auth/authProvider';

export const useAuth = () => useContext(AuthContext);
