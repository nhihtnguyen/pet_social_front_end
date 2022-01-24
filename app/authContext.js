import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

//api here is an axios instance which has the baseURL set according to the env.
import axiosClient from 'axiosSetup';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('access_token');
      if (token) {
        console.log('Got a token in the localStorage');
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axiosClient.get('users/me');
        if (user) {
          setUser(user);
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, []);

  const login = async ({ email, password }) => {
    const { data: token } = await axiosClient.post('auth/login', {
      email,
      password,
    });
    if (token) {
      localStorage.setItem('token', token, { expires: 60 });
      axiosClient.defaults.headers.Authorization = `Bearer ${token.token}`;
      const { data: user } = await axiosClient.get('users/me');
      setUser(user);
    }
  };

  const logout = (email, password) => {
    localStorage.removeItem('token');
    setUser(null);
    delete axiosClient.defaults.headers.Authorization;
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
