// pages/admin/add-car.js
import dynamic from 'next/dynamic';
const AddCarPageContent = dynamic(
  () => import('../../components/AddCarPageContent'),
  { ssr: false }
);

export default function AddCarPage() {
  return <AddCarPageContent />;
}
