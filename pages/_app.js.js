// pages/_app.js
import '../styles/main.css';
import { AdminProvider } from '../components/AdminContext';

export default function App({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}
