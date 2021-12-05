import { Provider } from 'react-redux';
import { store } from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className='color-theme-blue mont-font loaded'>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
