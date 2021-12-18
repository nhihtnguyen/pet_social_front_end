import { useAuth } from 'app/authContext';
import useLoading from 'app/authContext';
import Backdrop from 'components/backdrop/Backdrop';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';

const publicRoutes = ['/login', '/explore'];

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Backdrop className='justify-content-center align-items-center'>
        <Spinner className='text-current' animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Backdrop>
    );
  }
  if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
    router.push('/login');
  }
  return children;
};

export default ProtectRoute;
