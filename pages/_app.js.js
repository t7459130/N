// pages/_app.js
import '../styles/main.css';
import { AdminProvider } from '../components/AdminContext';  // Import your provider

function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>     {/* Wrap whole app here */}
      <Component {...pageProps} />
    </AdminProvider>
  );
}

export default MyApp;
