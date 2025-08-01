// pages/_app.js
import '../styles/App.css';
import { AdminProvider } from '../AdminContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}
