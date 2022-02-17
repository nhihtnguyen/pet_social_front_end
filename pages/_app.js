import { store } from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss';
import { AuthProvider } from 'app/authContext';
import ProtectRoute from 'components/ProtectedRoute';
import { NotificationProvider } from 'app/notificationContext';
import CentralNotification from 'components/CentralNotification';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <AuthProvider store={store}>
      <NotificationProvider>
        <ProtectRoute>
          <CentralNotification />

          <div className='color-theme-violet mont-font loaded'>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </ProtectRoute>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default MyApp;
