// pages/AddCarPage.js
import dynamic from 'next/dynamic';

const AddCarPageContent = dynamic(() => import('../components/AddCarPageContent'), {
  ssr: false, // ⛔ disable server-side rendering
});

export default AddCarPageContent;
