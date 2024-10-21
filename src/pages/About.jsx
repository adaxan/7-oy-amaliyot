import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function About() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`products`)
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-32 mt-5">
        {products.length > 0 &&
          products.map(function (product) {
            return (
              <div
                key={product.id}
                onClick={() => handleDetails(product.id)}
                className="border border-transparent rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={product.attributes.image}
                  alt=""
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="font-semibold text-lg mt-2">
                  {product.attributes.title}
                </h2>
                <h3 className="text-blue-600 font-bold">
                  {product.attributes.price} $
                </h3>
                <p className="text-gray-600">
                  {product.attributes.description}
                </p>
              </div>
            );
          })}
      </div>
  )
}

export default About;
