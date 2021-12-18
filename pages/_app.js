import { store } from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss';
import { AuthProvider } from 'app/authContext';
import ProtectRoute from 'components/ProtectedRoute';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <AuthProvider store={store}>
      <ProtectRoute>
        <div className='color-theme-violet mont-font loaded'>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </ProtectRoute>
    </AuthProvider>
  );
}

export default MyApp;
