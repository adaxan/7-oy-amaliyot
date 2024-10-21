import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App";

function MainLayout({ children }) {
  const {cart, setCart} = useContext(CartContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    let sum = 0;
    cart.forEach(c => {
      sum += Number(c.count)
    });

    setCount(sum)
  }, [cart])

  function handleGoCart(event) {
    event.preventDefault();
    navigate("/cart")
  }

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
          <button className="text-2xl cursor-pointer">🌙</button>
          <div className="relative">
            <button onClick={handleGoCart} className="text-2xl cursor-pointer">🛒</button>    
            <h4 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {count}
            </h4>
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
