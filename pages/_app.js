import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import 'antd/dist/antd.css';
import {wrapper} from '../redux/store';
import '../styles/Mapbox.css';
import '../styles/Modal.css';

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: 'z-50',
  delay: 100
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
