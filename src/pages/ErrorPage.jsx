import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
      <p className="text-lg text-gray-600 mb-6">Siz izlayotgan sahifa mavjud emas yoki boshqa joyga ko'chirilgan.</p>
      <button
        onClick={goBack}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
      >
        Ortga qaytish
      </button>
    </div>
  );
}

export default ErrorPage;
