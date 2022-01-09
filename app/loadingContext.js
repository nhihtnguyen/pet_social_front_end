import { createContext, useState, useContext, useEffect } from 'react';
import Backdrop from 'components/backdrop/Backdrop';
import { Spinner } from 'react-bootstrap';

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
