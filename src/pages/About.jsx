import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function About() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sortBy, setSortBy] = useState("a-z");
  const [priceRange, setPriceRange] = useState(1000);
  const [freeShipping, setFreeShipping] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category, company, sortBy, priceRange, freeShipping, search]);

  const fetchProducts = () => {
    let query = `products?price_lte=${priceRange}`;

    if (category !== "all") query += `&category=${category}`;
    if (company !== "all") query += `&company=${company}`;
    if (freeShipping) query += `&free_shipping=true`;
    if (search) query += `&search=${search}`;

    if (sortBy === "a-z") query += `&sort=title:asc`;
    else if (sortBy === "z-a") query += `&sort=title:desc`;
    else if (sortBy === "low-high") query += `&sort=price:asc`;
    else if (sortBy === "high-low") query += `&sort=price:desc`;

    http
      .get(query)
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  function handleReset() {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setSortBy("a-z");
    setPriceRange(1000);
    setFreeShipping(false);
  }

  return (
    <div className="mx-32 mt-5">
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-52"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Companies</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded-lg w-20"
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full"
          />
          <span>${priceRange}</span>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={() => setFreeShipping(!freeShipping)}
          />
          <span>Free Shipping</span>
        </label>

        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
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
          ))}
      </div>
    </div>
  );
}

export default About;
