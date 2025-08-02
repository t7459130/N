// pages/_app.js
import '../styles/globals.css';
import { AdminProvider } from '../components/AdminContext'; // adjust path if needed

function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}

export default MyApp;
