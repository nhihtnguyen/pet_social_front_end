import { store } from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss';
import { AuthProvider } from 'app/authContext';
import ProtectRoute from 'components/ProtectedRoute';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <AuthProvider store={store}>
        <ProtectRoute>
          <div className='color-theme-violet mont-font loaded'>
            {getLayout(<Component {...pageProps} />)}
          </div>
        </ProtectRoute>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
