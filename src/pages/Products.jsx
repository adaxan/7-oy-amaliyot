import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
    price: 100000,
    freeShipping: false
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = () => {
    const { search, category, company, order, price, freeShipping } = filters;
    http.get(`products?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}&freeShipping=${freeShipping}`)
      .then(response => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      company: 'all',
      order: 'a-z',
      price: 100000,
      freeShipping: false
    });
  };

  return (
    <div className="p-8">
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Search Product</label>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={filters.search}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Select Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Select Company</label>
          <select
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          >
            <option value="all">All Companies</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Sort By</label>
          <select
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
            className="border p-2 text-grey-900 rounded-md"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Select Price</label>
          <input
            type="range"
            name="price"
            min="0"
            max="50000"
            value={filters.price}
            onChange={handleFilterChange}
            className="w-full"
          />
          <span>${filters.price.toLocaleString()}</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="freeShipping"
            checked={filters.freeShipping}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label className="font-semibold">Free Shipping</label>
        </div>


        <div className="flex gap-4">
          <button onClick={fetchProducts} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            SEARCH
          </button>
          <button onClick={resetFilters} className="bg-pink-500 text-white px-4 py-2 rounded-md">
            RESET
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700">{product.attributes.title}</h2>
                <p className="text-gray-500">${product.attributes.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;