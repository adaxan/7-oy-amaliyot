import React from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="container mx-auto">
      <header className="flex justify-evenly items-center p-4 bg-gray-100">
        <div className="logo">
          <h1 className="text-2xl font-bold text-blue-500"><Link to="/">C</Link></h1>
        </div>
        <nav className="nav">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-gray-800 py-3 px-5 rounded-md transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-2xl">🌙</span>
          <div className="relative">
            <span className="text-2xl">🛒</span>    
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:shadow-lg transform hover:scale-105">
            LOGOUT
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
