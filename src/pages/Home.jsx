import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function Home() {
  const images = [
    "https://wallpapers.com/images/hd/all-anime-itchigo-kurosaki-iqgoc9lu4ulwtpbv.jpg",
    "https://images.alphacoders.com/598/598846.jpg",
    "https://wallpapers.com/images/featured/anime-dbt18qjb7b1cstr1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const intervalRef = useRef(null);
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [totalImages]);

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="home">
      <section className="flex flex-col md:flex-row justify-center items-center mb-12 p-6 mt-10">
        <div className="text-content max-w-lg text-center md:text-left">
          <h1 className="text-4xl font-bold mb-6">
            We are changing the way people shop
          </h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati.
          </p>
          <button className="btn btn-active btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
            OUR PRODUCTS
          </button>
        </div>

        <div className="image-slider overflow-hidden flex w-full md:w-1/2 mt-6 md:mt-0 justify-center">
          <div
            className="flex space-x-4 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Furniture ${index + 1}`}
                className="h-64 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      <h2 className="font-black text-2xl ml-32">Featured products</h2>
      <hr className="w-2/3 ml-32 mt-5" />

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
    </div>
  );
}

export default Home;
