import { createContext, useState, useContext, useEffect } from 'react';
import Backdrop from 'components/backdrop/Backdrop';
import { Spinner, Toast } from 'react-bootstrap';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState([]);
  const [worker, setWorker] = useState('');
  const [message, setMessage] = useState({
    image: 'https://via.placeholder.com/40',
    title: 'Bootstrap',
    time: '11 mins ago',
    content: 'Hello, world! This is a toast message.',
  });
  const [position, setPosition] = useState('top-start');
  const [delay, setDelay] = useState(0);
  const [variant, setVariant] = useState('');

  const showMessage = (incomingMessage, _delay, _variant, _loading = false) => {
    setMessage(incomingMessage);
    setHistory([
      ...history,
      { incomingMessage, delay: _delay, variant: _variant },
    ]);
    setVariant(_variant);
    setDelay(_delay);
    setLoading(_loading);
    setShow(true);
  };

  return (
    <NotificationContext.Provider
      value={{
        loading,
        setLoading,
        show,
        setShow,
        showMessage,
        message,
        delay,
        position,
        variant,
        history,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
