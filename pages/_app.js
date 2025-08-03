// pages/_app.js
import '../styles/main.css'; // <-- This import is critical
import { AdminProvider } from '../components/AdminContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}
