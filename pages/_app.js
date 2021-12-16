import { Provider } from 'react-redux';
import { store } from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <div className='color-theme-violet mont-font loaded'>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </Provider>
  );
}

export default MyApp;
