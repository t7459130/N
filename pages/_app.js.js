// pages/_app.js
import React from 'react';
import { AdminProvider } from '../components/AdminContext'; // Adjust if path is different
import '../styles/main.css'; // If you have global CSS

function MyApp({ Component, pageProps }) {
  return (
    <AdminProvider>
      <Component {...pageProps} />
    </AdminProvider>
  );
}

export default MyApp;
