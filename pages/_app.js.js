// pages/_app.js
import React from 'react';
import '../styles/globals.css'; // Only if you have global styles
import { AdminContextProvider } from '../components/AdminContext'; // Adjust the path if needed

function MyApp({ Component, pageProps }) {
  return (
    <AdminContextProvider>
      <Component {...pageProps} />
    </AdminContextProvider>
  );
}

export default MyApp;
